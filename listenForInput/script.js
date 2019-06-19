if(!window.webkitSpeechRecognition){
      log('Sorry this will work only in Chrome for now...');
}
const magic_word = 'hello';
var times = 0;
let recognition = new webkitSpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

recognition.onresult = e => {
    var transcripts  = [].concat.apply([], [...e.results].map(res => [...res].map(alt => alt.transcript)));
    if(transcripts.some(t=>t.indexOf(magic_word)>-1)){
        log('!!!do something awesome!!!');
        times++;
        awesome.textContent = 'I heard you say Hello ' + times + ' times.';
    }
    else{
        log('understood ' + JSON.stringify(transcripts));
    }
}
function stopSpeech(){
    recognition.stop();
    status_.className = 'inactive';
}
function startSpeech(){
    try{
        recognition.start();
    }
    catch(e){}
    status_.className = 'active';
}

navigator.mediaDevices.getUserMedia({audio:true})
.then(stream => detectSilence(stream, stopSpeech, startSpeech))
.catch(e => log(e.message));


function detectSilence(
      stream,
      onSoundEnd = _=>{},
      onSoundStart = _=>{},
      silence_delay = 500,
      min_decibels = -80
      ) {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      const streamNode = ctx.createMediaStreamSource(stream);
      streamNode.connect(analyser);
      analyser.minDecibels = min_decibels;

      const data = new Uint8Array(analyser.frequencyBinCount);
      let silence_start = performance.now();
      let triggered = false;

      function loop(time) {
              requestAnimationFrame(loop);
              analyser.getByteFrequencyData(data);
              if (data.some(v => v)) {
                        if(triggered){
                                    triggered = false;
                                    onSoundStart();
                                    }
                        silence_start = time;
                      }
              if (!triggered && time - silence_start > silence_delay) {
                        onSoundEnd();
                        triggered = true;
                      }
            }
      loop();
}
function log(txt){
        log_.textContent += txt + '\n';
}
