const beginnerBtn = document.querySelector("#beginner");
const intermediateBtn = document.querySelector("#intermediate");
const hardBtn = document.querySelector("#hard");
const checkBtn = document.querySelector("#submit-word");
const exitBtn = document.querySelector("#end-game");
const newGameBtn = document.querySelector("#new-game");

const speech = new SpeechSynthesisUtterance();

let inputWord;
let score = 0;
let allScore = 0;
let message = document.querySelector("#message");
let arrIncorrectWords = [];
let lvlDifficulty;
let scoreCard = document.querySelector("#popup");
let displayScore = document.querySelector("#displayScore");

beginnerBtn.addEventListener("click", beginListenWord);
intermediateBtn.addEventListener("click", interListenWord);
hardBtn.addEventListener("click", hardListenWord);
checkBtn.addEventListener("click", checkSpelling);
exitBtn.addEventListener("click", endGame);
newGameBtn.addEventListener("click", newGame);

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    checkSpelling();
  }
});

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
  lvlDifficulty = "begin";

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
  lvlDifficulty = "inter";

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
  lvlDifficulty = "hard";

  window.speechSynthesis.speak(speech);
  console.log(inputWord);
}

async function checkSpelling() {
  let input = document.querySelector("#input").value.toLowerCase();

  // Checking for correct word
  if (input === inputWord.toLowerCase()) {
    speech.text = "That's right";
    speech.rate = 0.8;
    message.textContent = `That's right! The correct spelling is ${inputWord}.`;

    // Adding score for correct word to player's score and overall score
    if (lvlDifficulty === "begin") {
      score += 1;
      allScore += 1;
    } else if (lvlDifficulty === "inter") {
      score += 2;
      allScore += 2;
    } else if (lvlDifficulty === "hard") {
      score += 3;
      allScore += 3;
    }

    // Checking for uncorrect word
  } else if (input != inputWord && input.length > 0) {
    console.log(`The correct spelling is ${inputWord.split("")}.`);
    speech.text = `It is not right!`;
    speech.rate = 0.8;
    message.textContent = `It is not right!  The correct spelling is ${inputWord}.`;

    // Adding score only for overall score
    if (lvlDifficulty === "begin") {
      allScore += 1;
    } else if (lvlDifficulty === "inter") {
      allScore += 2;
    } else if (lvlDifficulty === "hard") {
      allScore += 3;
    }

    // Adding incorrect word to arr
    arrIncorrectWords.push(inputWord);
    console.log(arrIncorrectWords);
  }

  // Message dissappears
  setTimeout(() => {
    message.textContent = "";
  }, 2500);

  // Input word dissappears
  input.textContent = setTimeout(() => {
    document.querySelector("#input").value = "";
  }, 2500);

  console.log(arrIncorrectWords);

  window.speechSynthesis.speak(speech);
}

function endGame(e) {
  // Pop-up appears
  scoreCard.classList.add("open-popup");

  // Creating list with incorrect words from array:
  let content = document.querySelector("#content");
  let list = "<ul>";
  for (i = 0; i < arrIncorrectWords.length; i++) {
    {
      list += "<li>" + arrIncorrectWords[i] + "</li>";
    }
    list += "</ul>";

    displayScore.textContent = `${score}/${allScore}`;
    content.innerHTML = list;
  }
}

function newGame() {
  scoreCard.classList.remove("open-popup");
  location.reload();
}
