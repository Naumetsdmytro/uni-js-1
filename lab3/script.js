let names = [
    "Bill",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Steven",
    "Larry",
    "Paula",
    "Laura",
    "Jim",
  ];
  
  for (let name of names) {
    const firstChar = name.charAt(0).toLowerCase();
    firstChar === "j" ? speekGoodBye(name) : speekHello(name);
  }
  console.log("------")
  
  const threshold = 95;
  
  console.log("ASCII:");
  
  for (let name of names) {
    const asciiLastLetter = name
      .charAt(name.length - 1)
      .toLowerCase()
      .charCodeAt(0);
    console.log(`${name} (ASCII last letter: ${asciiLastLetter})`);
  
    asciiLastLetter > threshold ? speekHello(name) : speekGoodBye(name);
  }