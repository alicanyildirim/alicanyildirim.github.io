var message = document.querySelector('#message');
var confidence = document.querySelector('#confidence');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var grammar = '#JSGF V1.0;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var isModeNavigation = 0;
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;
var focusedField = 0;
recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    command = command.toLowerCase();
    //extracting words
    var words = command.match(/("[^"]+"|[^"\s]+)/g);
    message.textContent = 'Voice Input: ' + command + '.';
    var inputFields = getInputFields();
    if (command === 'enter navigation mode')
    {
        isModeNavigation = 1;
        modes.textContent = "Navigation Mode";
    }
    else if (command === 'enter input mode')
    {
        isModeNavigation = 0;
        modes.textContent = "Input Mode";
    }
    else
    {
        // if user is in the input mode
        if(isModeNavigation === 0)
        {
            if (focusedField === 0 && (command !== 'next field' || command !== 'previous field'))
            {
                initialFocus(inputFields);
            }
            else if (command === 'next field' || command === 'previous field')
            {

                modes.textContent = "Why are you not running?";
                //inputFields[1].focus();
                (function setFocus(inputFields,focusedField,command) {
                    if(command === 'next field')
                    {
                        modes.textContent = "Inside Upper";
                        if(!(inputFields.length === focusedField+1))
                        {
                            modes.textContent = "Inside IF";
                            focusedField++;
                            window.setTimeout(() => {
                                    document.getElementById(inputFields[focusedField].id).focus();
                            }, 0);
                        }

                    }
                    else if(command === 'previous field')
                    {
                        if(focusedField !== 0)
                        {
                            focusedField--;
                            window.setTimeout(() => {
                                    inputFields[focusedField].focus();
                            }, 0);
                        }

                    }
                })();
                //setFocus(inputFields,focusedField,command);
            }
            else
            {
                modes.textContent = "You gonna do me like that?!";
            }

        }
        //if user is in the navigation mode
        else if(isModeNavigation === 1)
        {
            if(command === 'next' ) {
                document.querySelector('.next').click();
            }
            else if(command === 'previous') {
                document.querySelector('.previous').click();
            }
        }

    }
  recognition.start();
};
// using the tag name get the id and name of the all the input fields
function getInputFields()
{
    var form = document.getElementsByTagName("FORM")[0];
    var inputFields = [];
    for (var i = 0; i < form.length; i++)
    {
       inputFields.push(form[i]);
    }
    return inputFields;

}
// use this function to focus on fields.
// first field must be focused on load.
// this only matters in input mode.
function initialFocus(inputFields)
{
    inputFields[0].focus();
}
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
