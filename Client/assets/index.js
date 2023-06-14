

const beginnerBtn = document.querySelector("#beginner");
const intermediateBtn = document.querySelector("#intermediate");
const hardBtn = document.querySelector("#hard");
const checkBtn = document.querySelector("#submit-word");
// const resetBtn = document.querySelector("#resetBtn");
const inputTextBox = document.querySelector("#input")
const endGameBtn = document.querySelector("#end-game")

const speech = new SpeechSynthesisUtterance();

// addWords.addEventListener("click", addWord);
// listenBtn.addEventListener("click", listenWord );
beginnerBtn.addEventListener("click", addDefBeg)
intermediateBtn.addEventListener("click", addDefInter);
hardBtn.addEventListener("click", addDefHar);
checkBtn.addEventListener("click", checkSpelling);
//resetBtn.addEventListener("click", function () {
// location.reload();
//});

// Disable the textbox, check button and end game button on load
inputTextBox.classList.add("disabled")
checkBtn.classList.add("disabled")
endGameBtn.classList.add("disabled")

async function beginRandomWord() {
  const response = await fetch("http://localhost:3000/random/easy");
  const data = await response.json();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}
  return data.word.toLowerCase()
}

let inputWord;

async function addDefBeg(e) {
  await beginListenWord()
  const input = inputWord;
  try {
    const respData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
    const data = await respData.json();
    console.log(respData.ok)
    console.log(data)
    const def = data[0].meanings[0].definitions[0].definition;
    const defi = document.querySelector('#definition');
    defi.innerHTML = "Definition:  " + def

  } catch (error) {
    // Handle any errors that occur during the API request
    console.log('An error occurred:', error);
  }
}
  
async function beginListenWord() {
  const input = document.querySelector("#input").value;
  inputWord = await beginRandomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
  swapEnable()
}

async function interRandomWord() {
  const response = await fetch("http://localhost:3000/random/inter");
  const data = await response.json();
  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}
  return data.word.toLowerCase()
}

async function addDefInter(e) {
  await interListenWord()
  const input = inputWord;
  try {
    const respData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
    const data = await respData.json();
    console.log(respData.ok)
    console.log(data)
    const def = data[0].meanings[0].definitions[0].definition;
    const defi = document.querySelector('#definition');
    defi.innerHTML = "Definition:  " + def

  } catch (error) {
    // Handle any errors that occur during the API request
    console.log('An error occurred:', error);
  }
}

async function interListenWord() {
  const input = document.querySelector("#input").value;
  inputWord = await interRandomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
  swapEnable()
}

async function hardRandomWord() {
  const response = await fetch("http://localhost:3000/random/hard");
  const data = await response.json();
  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
}
  return data.word.toLowerCase()
}

async function addDefHar(e) {
  await hardListenWord()
  const input = inputWord;
  try {
    const respData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
    const data = await respData.json();
    console.log(respData.ok)
    console.log(data)
    const def = data[0].meanings[0].definitions[0].definition;
    const defi = document.querySelector('#definition');
    defi.innerHTML = "Definition:  " + def

  } catch (error) {
    // Handle any errors that occur during the API request
    console.log('An error occurred:', error);
  }
}

async function hardListenWord() {
  const input = document.querySelector("#input").value;
  inputWord = await hardRandomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
  swapEnable()
}
async function checkSpelling() {
  const input = document.querySelector("#input").value.toLowerCase();

  if (input == inputWord) {
    speech.text = "That's right";
    speech.rate = 0.8;
  } else if (input != inputWord) {
    console.log(`The correct spelling is ${inputWord}`);
    speech.text = `It is not right!  The correct spelling is ${inputWord}`;
    speech.rate = 0.8;
  }

  window.speechSynthesis.speak(speech);

  swapEnable()
}

async function listenWord() {
  const input = document.querySelector("#input").value;
  inputWord = await randomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);

  swapEnable();

}

// This function will swap enabling/disabling two groups of elements in the HTML so that they are mutually exclusive
// Group 1: textbox, Check button and End Game button
// Group 2: The three difficulty select button
function swapEnable() {

  const elements = [beginnerBtn, intermediateBtn, hardBtn, inputTextBox, checkBtn, endGameBtn]

  for (let i = 0; i < elements.length; i++) {

    const element = elements[i]

    if (element.classList.contains("disabled")) {
      element.classList.remove("disabled");
    } else {
      element.classList.add("disabled");
    }
  }
}
