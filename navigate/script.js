if ('webkitSpeechRecognition' in window) {
      var recognition = new webkitSpeechRecognition();
      var final_transcript = '';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = function( event ) {
              var final_transcript = '';
              for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                                    final_transcript += event.results[i][0].transcript;
                                  }
                      }
              document.getElementById( 'speech' ).value = final_transcript;
            };
      recognition.start();
}
