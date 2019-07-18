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
var mode = 0;


const inputTypes = ["text","radio","checkbox", "dropdown"];

const commands = ["refresh","next","previous","submit","clear"];



var message = document.querySelector('#header_1');

var focusedField    = 0;
var focusedQuestion = 0;

//initiliaze the highlighted question. the first question is highlighted first.



// think next as tab and prev as shift tab

// array.from makes it an array. we want that.
const list = Array.from(document.getElementsByTagName("LI"));
const questions = list.filter(question => question.getAttribute('data-type') )


const textFields     = document.querySelectorAll('input[type = text]');
const radioFields    = document.querySelectorAll('input[type = radio]');
const checkboxFields = document.querySelectorAll('input[type = checkbox]');


// TODO filter this list.
list[focusedQuestion].style.backgroundColor = "orange";


recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var input = event.results[last][0].transcript;
    input = input.toLowerCase();
    //extracting words
    message.textContent = 'Voice Input: ' + input + '.';
    // using the tag name get the id and name of the all the input fields
    if(input == 'submit')
    {
        document.getElementById("input_5").click();
    }

    function fieldOnEdge(textFields) {
        return (textFields[0].id == document.activeElement.id && input == 'previous'
            || textFields[textFields.length-1].id == document.activeElement.id && input == 'next');
    }

    function questionOnEdge(questions) {
        return (focusedQuestion == 0 && input == 'previous question'
            || focusedQuestion == questions.length-1 && input == 'next question');
    }
    //navigate between questions. take command (next q,previous q) as input and change the bg color of the highlighted question to orange. If the highlighted element does not change do not change the color.

    function changeQuestion(command,questions)
    {
        if(!questionOnEdge(questions))
        {
            if(input == 'next question')
            {
                questions[focusedQuestion].style.backgroundColor = "";
                focusedQuestion++;
                questions[focusedQuestion].style.backgroundColor = "orange";

            }
            else if(input == 'previous question')
            {
                questions[focusedQuestion].style.backgroundColor = "";
                focusedQuestion--;
                questions[focusedQuestion].style.backgroundColor = "orange";
            }
        }
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

    function selectRadio(fields)
    {
        for(let i = 0; i < fields.length; i++)
        {
            const radioValue = fields[i].value.toLowerCase();
            if(input == 'select ' + radioValue)
            {
                fields[i].checked = true;
            }
        }

    }

    function deselectRadio(fields)
    {
        for(let i = 0; i < fields.length; i++)
        {
            const radioValue = fields[i].value.toLowerCase();
            if(input == 'select ' + radioValue)
            {
                fields[i].checked = false;
            }
        }

    }
    const words = input.match(/("[^"]+"|[^"\s]+)/g);
    // TODO should input field go the the next input field once it is filled? that sounds better since it would make the navigation a bit easier.

    // may need to deal with the other form elements that have the same input types.
    // TODO use the list element the form element is wrapped around using the data-type and id in conjuction.
    // hold the active form element in store and enable users the navigate smoothly.

    //list will hold the form elements, need to deal with other form elements by their data-types
    //may be an error coul be thrown if the highlighted question does not support the operation given.

    if(input == 'next' || input == 'previous')
    {

        if(checkFocusedID(textFields) == false)
        {
            textFields[0].focus();
            focusedField = 0;
        }


        if(!fieldOnEdge(input,textFields))
        {
            if(input == 'next')
            {
                focusedField++;
                textFields[focusedField].focus();

            }
            else if(input == 'previous')
            {
                focusedField--;
                textFields[focusedField].focus();
            }
        }
    }
    else if(input == 'clear')
    {
        if(checkFocusedID(textFields) == false)
        {
            textFields[0].focus();
            focusedField = 0;
        }
        textFields[focusedField].value = "";
    }
    else if(words[0] == 'select')
    {
        selectRadio(radioFields);
    }
    else if(words[0] == 'deselect')
    {
        deselectRadio(radioFields);
    }
    else
    {
        if(checkFocusedID(textFields) == false)
        {
            textFields[0].focus();
            focusedField = 0;
        }

        textFields[focusedField].value = input;

        //after the input is entered move forward if you can.

        if(focusedField !== textFields.length-1)
        {
                focusedField++;
                textFields[focusedField].focus();
        }
    }
}

recognition.onspeechend = () => recognition.start();

recognition.onerror = (event) => message.textContent = 'Error occurred in recognition: ' + event.error;

recognition.onend = () => recognition.start();


window.onload = (event) => recognition.start();



