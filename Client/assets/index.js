const api = "82247a01-eafb-4f68-9d9c-5843e9601cbd";

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

const randomWord =
  spellingWords[Math.floor(Math.random() * spellingWords.length)];

const listenBtn = document.querySelector("#listenBtn");
const checkBtn = document.querySelector("#checkBtn");
const resetBtn = document.querySelector("#resetBtn");

const speech = new SpeechSynthesisUtterance();
const input = document.querySelector("#input");

input.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    checkSpelling();
  }
});

listenBtn.addEventListener("click", listenWord);
checkBtn.addEventListener("click", checkSpelling);
resetBtn.addEventListener("click", function () {
  location.reload();
});

function checkSpelling() {
  const input = document.querySelector("#input").value;

  if (input === "") {
    alert("Please type a word");
  }
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
  speech.text = `${randomWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;
  document.querySelector("#input").focus();

  window.speechSynthesis.speak(speech);
}
