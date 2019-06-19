var message = document.querySelector('#message');
var record = document.querySelector('#record');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.onresult = function(event) {
    var last = event.results.length -1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';
    if(command.toLowerCase() === "select male")
    {
        document.querySelector('#male').checked = true;
    }
    else if(command.toLowerCase() === "select female")
    {
        document.querySelector('#female').checked = true;
    }
    else if (command.toLowerCase() === "select other")
    {
        document.querySelector('#other').checked = true;
    }
    recognition.start();
};

recognition.onspeechend = () => recognition.stop();
recognition.onerror = (event) =>
    message.textContent = "Error occurred in recognition: " + event.error;
record.addEventListener('click', () => recognition.start());
