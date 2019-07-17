const R = require('ramda');

var message = document.querySelector('#message');
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

const changeMode = ["switch to input mode","switch to navigation mode"];
const generalCommands = ["refresh"];
const navigationCommands = ["next","previous"];
const inputCommands = ["next field","previous field","clearfield"];
const inputTypes = ["text","radio","checkbox", "dropdown"];



//indicate the starting mode.
var mode = 0;

//this is so hecky I want to cry
//added the functions getMode, concatWords here but it did not update the mode.
modes.textContent = "input mode";


//this are my cursed global variables.
var focusedField = 0;
var focused = 0;



recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var input = event.results[last][0].transcript;
    input = input.toLowerCase();
    //extracting words

    message.textContent = 'Voice Input: ' + input + '.';

    // if the input matches with one of the elements in changeMode
    // get the index of that matched element.
    // returns -1 if not a mode changing operation.
    // mode == 0 => input mode
    // mode == 1 => navigation mod
    // mode == 0 => input mode
    // mode == 1 => navigation mode

    //const inputTypes = ["text","radio","checkbox", "dropdown"];

    /*function getInputFields()
    {
        //assuming the form is wrapped around a form tag, and only one such occurence exists
        const form = document.getElementsByTagName("FORM")[0];
        var inputFields = [];

        for (var i = 0; i < form.length; i++)
        {
           inputFields.push(form[i]);
        }
        return inputFields;
    }*/

    const isInputModeCommand =  R.includes(input,changeMode);
    if(isInputModeCommand)
    {
        mode = R.findIndex(R.equals(input))(changeMode);
        //indicate the mode change
        const toWords = x => x.match(/("[^"]+"|[^"\s]+)/g);
        const getMode = mode => R.slice(2,4,toWords(changeMode[mode]));
        const concatWords = list => list[0] + " " + list[1];
        modes.textContent = concatWords(getMode(mode));
    }

    // if the input is not mode command
    else
    {
        //slicedInput = toWords(input);
        // input mode operations
        if(mode == 0)
        {
            // const inputCommands = ["next field","previous field","clearfield"];
            const operation = R.findIndex(R.equals(input))(inputCommands);
            if(operation != -1)
            {

            }

        }
        // navigation mode operations
        else if (mode == 1)
        {

        }

    }

    // if the mode == -1 then preserve the previous value
    // or else make it 0 since default is input mode

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
