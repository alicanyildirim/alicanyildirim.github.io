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


// array.from makes it an array. we want that.
const list = Array.from(document.getElementsByTagName("LI"));

// filter the list to get only related form elements that are inside list tag.
const questionsList = list.filter(question => question.getAttribute('data-type') != 'control_head'
    && question.getAttribute('data-type') != 'control_button'
    && question.getAttribute('data-type') != 'control_widget');


// get the input fields from the questionsList
// i can get the input fields in a question by Array.from(q[1].getElementsByTagName("input"));

const controlButton = list.filter(question => question.getAttribute('data-type') == 'control_button');
var message = document.querySelector('#header_1');
var number = document.querySelector('#number');

var focusedField    = 0;
var focusedQuestion = 0;
//initiliaze the highlighted question. the first question is highlighted first.
questionsList[focusedQuestion].style.backgroundColor = "orange";




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
        if(input == 'select ' + radioValue)
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
        if(input == 'select ' + radioValue)
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





// think next as tab and prev as shift tab



//get the type of the focused question, get the voice input and make action.






recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var input = event.results[last][0].transcript;
    input = input.toLowerCase();

    message.textContent = 'Voice Input: ' + input + '.';

    const words = input.match(/("[^"]+"|[^"\s]+)/g);

    if(input == 'next question' || input == 'previous question')
    {
        if(input == 'next question')
        {
        //    questionsList[focusedQuestion].style.backgroundColor = "";
            focusedQuestion++;
        //  questionsList[focusedQuestion].style.backgroundColor = "orange";
        }
        else if(input == 'previous question')
        {
        //    questionsList[focusedQuestion].style.backgroundColor = "";
            focusedQuestion--;
        //    questionsList[focusedQuestion].style.backgroundColor = "orange";
        }

        number.textContent = focusedQuestion;
    }
}

function questionOnEdge(input,questions) {
    return (focusedQuestion == 0 && input == 'previous question'
        || focusedQuestion == questions.length-1 && input == 'next question');
}


recognition.onerror = (event) => message.textContent = 'Error occurred in recognition: ' + event.error;


document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onspeechend = () => recognition.start();
window.onload = (event) => recognition.start();
recognition.onend = () => recognition.start();

