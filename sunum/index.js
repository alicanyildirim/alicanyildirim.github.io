// Web Speech API's SpeechRecognition interface used to initiate speech recognition
// This won't work offline since it depends on a server-based recognition engine.
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

//indicate the starting mode, which is input mode.


const inputTypes = ["text","radio","checkbox", "dropdown"];

const commands = ["refresh","next","previous","submit","clear"];


// array.from makes it an array. we want that.
const list = Array.from(document.getElementsByTagName("LI"));

// filter the list to get only related form elements that are inside list tag.
const questionsList = list.filter(question => question.getAttribute('data-type') != 'control_head'
    && question.getAttribute('data-type') != 'control_button'
    && question.getAttribute('data-type') != 'control_widget');


// get the input fields from the questionsList
// i can get the input fields in a question by Array.from(q[1].getElementsByTagName("input"));

const controlButton = list.filter(question => question.getAttribute('data-type') == 'control_button');
const submit = document.querySelector('button[type = submit]');

var message = document.querySelector('#message');
document.getElementById("message").style.color = "lightblue";

var focusedField    = 0;
var focusedQuestion = 0;




/*
    *
    *
    *
    *
*/


function fieldOnEdge(input,textFields) {
    return (textFields[0].id == document.activeElement.id && input == 'previous'
        || textFields[textFields.length-2].id == document.activeElement.id && input == 'next');
}



function checkFocusedID(textFields)
{
    for (let i = 0; i < textFields.length; i++)
    {
        if(document.activeElement.id == textFields[i].id)
        {
            focusedField = i;
            return true;
        }
    }
    return false;
}

function selectRadio(input,fields)
{
    for(let i = 0; i < fields.length; i++)
    {
        const radioValue = fields[i].value.toLowerCase();
        if(input.slice(7) == radioValue)
        {
            fields[i].checked = true;
        }
    }

}

function deselectRadio(input,fields)
{
    for(let i = 0; i < fields.length; i++)
    {
        const radioValue = fields[i].value.toLowerCase();
        if(input.slice(9) == radioValue)
        {
            fields[i].checked = false;
        }
    }

}



/*
    *
    *
    *
    *
*/


const name = document.querySelectorAll('input[type = text]');
const radioFields    = document.querySelectorAll('input[type = radio]');
const checkboxFields = document.querySelectorAll('input[type = checkbox]');



recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var input = event.results[last][0].transcript;
    input = input.toLowerCase();
    //extracting words
    message.textContent = 'Voice Input: ' + input + '.';
    // using the tag name get the id and name of the all the input fields
    if(input == 'submit')
    {
        submit.click();
    }

    var words = input.match(/("[^"]+"|[^"\s]+)/g);


    if(input == 'next' || input == 'previous')
    {

        if(checkFocusedID(name) == false)
        {
            name[0].focus();
            focusedField = 0;
        }
        else if(!fieldOnEdge(input,name))
        {
            if(input == 'next')
            {
                focusedField++;
                name[focusedField].focus();

            }
            else if(input == 'previous')
            {
                focusedField--;
                name[focusedField].focus();
            }
        }
    }
    else if(words[0] == 'select')
    {
        selectRadio(input,radioFields);
    }
    else if(words[0] == 'deselect')
    {
        deselectRadio(input,radioFields);
    }
    else if(document.activeElement.type == "email")
    {
        if(input == "clear")
        {
            document.activeElement.value = "";
        }
        else
        {
            document.activeElement.value = (input.replace("at","@")).replace(/\s/g, "");
        }
    }
    else if (document.activeElement.type == "textarea")
    {
        if(input == "clear")
        {
            document.activeElement.value = "";
        }
        else
        {
            document.activeElement.value == input;
        }
    }
    else if(document.activeElement.type == "text")
    {
        // text field will be filled
        //
        if(input == 'clear')
        {
            if(checkFocusedID(name) == false)
            {
                name[0].focus();
                focusedField = 0;
            }
            name[focusedField].value = "";
        }
        else if(checkFocusedID(name) == false)
        {
            name[0].focus();
            focusedField = 0;
            name[focusedField].value = input.charAt(0).toUpperCase() + input.slice(1);;
        }
        else
        {
            name[focusedField].value = input.charAt(0).toUpperCase() + input.slice(1);
        }

        //after the input is entered move forward if you can.

    }

}


recognition.onerror = (event) => message.textContent = 'Error occurred in recognition: ' + event.error;

recognition.onspeechend = () => recognition.start();
window.onload = (event) => recognition.start();
recognition.onend = () => recognition.start();

