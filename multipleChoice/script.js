var message = document.querySelector('#message');
var confidence = document.querySelector('#confidence');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Voice Input: ' + command + '.';
    confidence.textContent = 'Confidence: ' + event.results[0][0].confidence;
    if(command.toLowerCase() === 'select steve'){
        document.querySelector('#chkSteve').checked = true;
    }
    else if (command.toLowerCase() === 'select tony'){
        document.querySelector('#chkTony').checked = true;
    }
    else if (command.toLowerCase() === 'select bruce'){
        document.querySelector('#chkBruce').checked = true;
    }
    else if (command.toLowerCase() === 'select nick'){
        document.querySelector('#chkNick').checked = true;
    }
    else if(command.toLowerCase() === 'deselect steve'){
        document.querySelector('#chkSteve').checked = false;
    }
    else if (command.toLowerCase() === 'deselect tony'){
        document.querySelector('#chkTony').checked = false;
    }
    else if (command.toLowerCase() === 'deselect bruce'){
        document.querySelector('#chkBruce').checked = false;
    }
    else if (command.toLowerCase() === 'deselect nick'){
        document.querySelector('#chkNick').checked = false;
    }
  recognition.start();
};
recognition.onspeechend = function() {
    recognition.start();
};
recognition.onerror = function(event) {
    message.textContent = 'Error occurred in recognition: ' + event.error;
}

window.onload = (event) => {
    recognition.start();
};
