var message = document.querySelector('#message');
var confidence = document.querySelector('#confidence');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var confidencePercent;
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';
    confidencePercent = (event.results[0][0].confidence * 100);
    confidence.textContent = 'Confidence: %' + confidencePercent.toFixed(2);
    if(command.toLowerCase() === 'next' ) {
        document.querySelector('.next').click();
    }
    else if(command.toLowerCase() === 'previous') {
        document.querySelector('.previous').click();
    }
    else
    {
        var form = document.getElementsByTagName("FORM")[0];
        var firstField = document.getElementsByTagName("INPUT")[0];
        for()
        switch(firstField.type) {
            case 'radio':

                break;
            case 'checkbox':
                break;
            case 'text':
                break;
            default:
        }
    }
  recognition.start();
};
recognition.onspeechend = function() {
    recognition.start();
};
recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}
recognition.onend = () => recognition.start();


window.onload = (event) => {
    recognition.start();
};
