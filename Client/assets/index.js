// let score;

// const listenBtn = document.querySelector("#listenBtn");
// const checkBtn = document.querySelector("#checkBtn");
// const resetBtn = document.querySelector("#resetBtn");

// const speech = new SpeechSynthesisUtterance();
// const input = document.querySelector("#input");

// input.addEventListener("keypress", (e) => {
//   if (e.keyCode === 13) {
//     checkSpelling();
//   }
// });

// listenBtn.addEventListener("click", dataGet);
// checkBtn.addEventListener("click", checkSpelling);
// resetBtn.addEventListener("click", function () {
//   location.reload();
// });

// function checkSpelling() {
//   const input = document.querySelector("#input").value;

//   if (input === "") {
//     alert("Please type a word");
//   } else if (input == randomWord) {
//     speech.text = "That's right";
//     speech.rate = 0.8;
//   } else if (input != randomWord) {
//     console.log(`The correct spelling is ${randomWord}.split()`);
//     speech.text = `It is not right!  The correct spelling is ${randomWord.split(
//       ""
//     )}`;
//     speech.rate = 0.8;
//   }

//   window.speechSynthesis.speak(speech);
// }

// function listenWord() {
//   speech.text = `${randomWord}`;
//   speech.rate = 0.8;
//   speech.lang = "en-US";
//   speech.volume = 1;
//   document.querySelector("#input").focus();

//   window.speechSynthesis.speak(speech);
// }

const listenBtn = document.querySelector("#beginner");
const checkBtn = document.querySelector("#submit-word");
// const resetBtn = document.querySelector("#resetBtn");

const speech = new SpeechSynthesisUtterance();

// addWords.addEventListener("click", addWord);
listenBtn.addEventListener("click", listenWord);
checkBtn.addEventListener("click", checkSpelling);
//resetBtn.addEventListener("click", function () {
// location.reload();
//});
async function randomWord() {
  const response = await fetch("http://localhost:3000/random");
  const data = await response.json();
  return data.word;
}

let inputWord;

async function checkSpelling() {
  const input = document.querySelector("#input").value;

  if (input == inputWord) {
    speech.text = "That's right";
    speech.rate = 0.8;
  } else if (input != inputWord) {
    console.log(`The correct spelling is ${inputWord}`);
    speech.text = `It is not right!  The correct spelling is ${inputWord}`;
    speech.rate = 0.8;
  }

  window.speechSynthesis.speak(speech);
}

async function listenWord() {
  const input = document.querySelector("#word").value;

  inputWord = await randomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  document.querySelector("#word").focus();

  window.speechSynthesis.speak(speech);
}
