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
var focusedField = 0;
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

    const textFields = document.querySelectorAll('input[type=text]');
    if(input == 'next' || input == 'previous')
    {

        if(checkFocusedID(textFields) == false)
        {
            textFields[0].focus();
            focusedField = 0;
        }


        if(!fieldOnEdge(textFields))
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
    else
    {
        if(checkFocusedID(textFields) == false)
        {
            textFields[0].focus();
            focusedField = 0;
        }

        textFields[focusedField].value = input;
    }
}

recognition.onspeechend = () => recognition.start();

recognition.onerror = (event) => message.textContent = 'Error occurred in recognition: ' + event.error;

recognition.onend = () => recognition.start();


window.onload = (event) => recognition.start();



