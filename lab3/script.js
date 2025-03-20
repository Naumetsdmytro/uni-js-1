(function () {
    const names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  
    for (let i = 0; i < names.length; i++) {
      const firstLetter = names[i].charAt(0).toLowerCase();
  
      if (firstLetter === 'j') {
        goodbyeSpeaker.speak(names[i]);
      } else {
        helloSpeaker.speak(names[i]);
      }
    }
  
    console.log("\nAdditional selection: Names with an even number of letters");
  
    for (let i = 0; i < names.length; i++) {
      if (names[i].length % 2 === 0) {
        console.log(names[i]);
      }
    }
  })();
  