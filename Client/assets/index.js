const beginnerBtn = document.querySelector("#beginner");
const intermediateBtn = document.querySelector("#intermediate");
const hardBtn = document.querySelector("#hard");
const checkBtn = document.querySelector("#submit-word");
// const resetBtn = document.querySelector("#resetBtn");

const speech = new SpeechSynthesisUtterance();

let inputWord;
let score = 0;

// addWords.addEventListener("click", addWord);
beginnerBtn.addEventListener("click", beginListenWord);
intermediateBtn.addEventListener("click", interListenWord);
hardBtn.addEventListener("click", hardListenWord);
checkBtn.addEventListener("click", checkSpelling);
input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    checkSpelling();
  }
});
//resetBtn.addEventListener("click", function () {

// location.reload();

//});

// Beginner section
async function beginRandomWord() {
  const response = await fetch(`http://localhost:3000/random/begin`);
  const data = await response.json();

  return data.word;
}

async function beginListenWord() {
  inputWord = await beginRandomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  document.querySelector("#input").focus();

  window.speechSynthesis.speak(speech);
  console.log(inputWord);
}

// Inter section
async function interRandomWord() {
  const response = await fetch(`http://localhost:3000/random/inter`);
  const data = await response.json();

  return data.word;
}

async function interListenWord() {
  inputWord = await interRandomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  document.querySelector("#input").focus();

  window.speechSynthesis.speak(speech);
  console.log(inputWord);
}

// Hard section
async function hardRandomWord() {
  const response = await fetch(`http://localhost:3000/random/hard`);
  const data = await response.json();

  return data.word;
}

async function hardListenWord() {
  inputWord = await hardRandomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  document.querySelector("#input").focus();

  window.speechSynthesis.speak(speech);
  console.log(inputWord);
}

// async function checkSpelling() {
//   const input = document.querySelector("#word").value;

//   if (input === inputWord) {
//     return data.word;
//   }
// }

async function checkSpelling() {
  const input = document.querySelector("#input").value;

  // if (inputWord === undefined) {
  //   speech.text = `Please type a word ${inputWord}`;
  //   speech.rate = 0.8;
  // }
  if (input === inputWord) {
    speech.text = "That's right";
    speech.rate = 0.8;
  } else if (input != inputWord) {
    console.log(`The correct spelling is ${inputWord}`);
    speech.text = `It is not right!  The correct spelling is ${inputWord}`;
    speech.rate = 0.8;
  }

  window.speechSynthesis.speak(speech);
}
