const spellingWords = [
  "dog",
  "zoom",
  "lettuce",
  "computer",
  "laptop",
  "table",
  "chair",
  "friend",
  "book",
  "towel",
];
// const url = "https://random-word-api.herokuapp.com/word";
const randomWord =
  spellingWords[Math.floor(Math.random() * spellingWords.length)];

const listenBtn = document.querySelector("#listenBtn");
const checkBtn = document.querySelector("#checkBtn");
const resetBtn = document.querySelector("#resetBtn");

const speech = new SpeechSynthesisUtterance();

listenBtn.addEventListener("click", listenWord);
checkBtn.addEventListener("click", checkSpelling);
resetBtn.addEventListener("click", function () {
  location.reload();
});

function checkSpelling() {
  const input = document.querySelector("#input").value;

  if (input == randomWord) {
    speech.text = "That's right";
    speech.rate = 0.8;
  } else if (input != randomWord) {
    console.log(`The correct spelling is ${randomWord}.split()`);
    speech.text = `It is not right!  The correct spelling is ${randomWord.split(
      ""
    )}`;
    speech.rate = 0.8;
  }

  window.speechSynthesis.speak(speech);
}

function listenWord() {
  const input = document.querySelector("#input").value;

  speech.text = `Your word is ${randomWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}
