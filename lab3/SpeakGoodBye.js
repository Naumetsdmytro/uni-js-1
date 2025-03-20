const goodbyeSpeaker = (function () {
    const speakWord = "Good Bye";
  
    function speak(name) {
      console.log(speakWord + " " + name);
    }
  
    return {
      speak
    };
  })();
  