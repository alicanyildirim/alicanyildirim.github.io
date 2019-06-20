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
    command = command.toLowerCase();
    message.textContent = 'Voice Input: ' + command + '.';
    if (command === 'enter navigation mode')
    {
        last = event.results.length - 1;
        command = event.results[last][0].transcript;
        command = command.toLowerCase();
        message.textContent = 'Voice Input: ' + command + '.';
        //generate new command
        navigationMode(command);
    }
    else if (command === 'enter input mode')
    {
        last = event.results.length - 1;
        command = event.results[last][0].transcript;
        command = command.toLowerCase();
        message.textContent = 'Voice Input: ' + command + '.';
        //generate new command
        inputMode(command);
    }
  recognition.start();
};
function navigationMode(command)
{
    if(command === 'next')
    {
        document.querySelector('.next').click();
    }
    else if (command === 'previous')
    {
        document.querySelector('.previous').click();
    }
    else if (command === 'enter input mode')
    {
        last = event.results.length - 1;
        command = event.results[last][0].transcript;
        command = command.toLowerCase();
        message.textContent = 'Voice Input: ' + command + '.';
        inputMode(command);

        // change the mode to the input mode.
        // by focusing on the form
    }
}
function inputMode(command)
{
    if(command === 'enter navitagiton mode')
    {
        //change the mode to the navigation mode
        //generate a new command
        last = event.results.length - 1;
        command = event.results[last][0].transcript;
        command = command.toLowerCase();
        message.textContent = 'Voice Input: ' + command + '.';
        navigationMode(command);

    }
    else if (command === 'select steve'){
        document.querySelector('#chkSteve').checked = true;
    }
    else if (command === 'select tony'){
        document.querySelector('#chkTony').checked = true;
    }
    else if (command === 'select bruce'){
        document.querySelector('#chkBruce').checked = true;
    }
    else if (command === 'select nick'){
        document.querySelector('#chkNick').checked = true;
    }
    else if(command === 'deselect steve'){
        document.querySelector('#chkSteve').checked = false;
    }
    else if (command === 'deselect tony'){
        document.querySelector('#chkTony').checked = false;
    }
    else if (command === 'deselect bruce'){
        document.querySelector('#chkBruce').checked = false;
    }
    else if (command === 'deselect nick'){
        document.querySelector('#chkNick').checked = false;
    }
    else
    {
        var focus = document.activeElement;
        focus.value=command;
        //get the element that has focus
        //the input will be given to that element.
    }

}
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
