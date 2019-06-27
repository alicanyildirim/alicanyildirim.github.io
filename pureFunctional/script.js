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
recognition.continuous = true;
recognition.interimResults = false;
var isModeNavigation = 0;
var focusedField = 0;
var focused = 0;
console.log(focusedField);
recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    command = command.toLowerCase();
    //extracting words
    var words = command.match(/("[^"]+"|[^"\s]+)/g);
    message.textContent = 'Voice Input: ' + command + '.';
    var inputFields = getInputFields();
    if (command === 'switch to navigation mode')
    {
        isModeNavigation = 1;
        modes.textContent = "Navigation Mode";
    }
    else if (command === 'switch to input mode')
    {
        isModeNavigation = 0;
        modes.textContent = "Input Mode";
    }
    else
    {
        // if user is in the input mode
        if(isModeNavigation === 0)
        {
            // well will I write every single command here ?!
            if ( focused === 0 && command !== 'next field' &&  command !== 'previous field'
                && command !== 'clearfield' && command !== 'refresh' )
            {
                //add a function to detect the input type so that operation to be performed could be selected
                inputFields[focusedField].focus();
                inputFields[focusedField].value = command;
                focusedField++;
                focused = 1;

                switch(inputFields[focusedField].type) {
                    case 'radio':
                        if(words[0] === 'select')
                        {
                            //assuming one word value
                            // if the voice input given for the choice matches the value of the
                            // radio button select it.
                            // do we need to clear this one?
                            for ( let i = 0; i < inputFields.length; i++)
                            {
                                if ( words[1] === inputFields[i].value)
                                {
                                    modes.textContent = inputFields[i].value;
                                    inputFields[i].checked = true;
                                }
                            }
                        }
                        break;
                    case 'checkbox':
                        if(words[0] === 'select')
                        {
                            //assuming one word value
                            // if the voice input given for the choice matches the value of the
                            // radio button select it.
                            // do we need to clear this one?
                            for ( let i = 0; i < inputFields.length; i++)
                            {
                                if ( words[1] === inputFields[i].value)
                                {
                                    inputFields[i].checked = true;
                                }
                            }
                        }
                        else if(words[0] === 'deselect')
                        {
                            //assuming one word value
                            // if the voice input given for the choice matches the value of the
                            // radio button select it.
                            // do we need to clear this one?
                            for ( let i = 0; i < inputFields.length; i++)
                            {
                                if ( words[1] === inputFields[i].value)
                                {
                                    inputFields[i].checked = false;
                                }
                            }
                        }
                        break;
                    default:
                }


            }
            // if the next field, previous field, or clear field commands are called this block will run
            else if (command === 'next field' || command === 'previous field' || command === 'clearfield')
            {
                // need this focused flag because it enters the above block two times otherwise.
                focused = 0;
                {
                    if(command === 'next field')
                    {
                        if(!(inputFields.length === focusedField+1))
                        {
                            focusedField++;
                            inputFields[focusedField].focus();
                        }

                    }
                    else if(command === 'previous field')
                    {
                        if(focusedField !== 0)
                        {
                            focusedField--;
                            inputFields[focusedField].focus();
                        }

                    }
                    else if(command === 'clearfield')
                    {
                        inputFields[focusedField].value = "";
                    }
                }
                //setFocus(inputFields,focusedField,command);
            }
            else if ( command === 'refresh' )
            {
                location.reload();
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
    //assuming the form is wrapped around a form tag, and only one such occurence exists
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
