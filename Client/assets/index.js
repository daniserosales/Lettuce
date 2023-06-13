

// const spellingWords = [
//   "dog",
//   "zoom",
//   "lettuce",
//   "computer",
//   "laptop",
//   "table",
//   "chair",
//   "friend",
//   "book",
//   "towel",
// ];
// const url = "https://random-word-api.herokuapp.com/word";

  
// const addWords = document.querySelector("#addBtn")

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
  return data.word
}
// async function addWord() {
//  const input = document.querySelector("#addInput").value;
//  const checkData = await fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
//  const response = await  checkData.json();

//  console.log(response)
//  const options = {
//   method: "POST",
//   headers: {
//       "Content-Type": "application/json"
//   },
//   body: JSON.stringify(response)
// }
//  if (checkData.status == 200){
//   document.querySelector("#addInput").value = "";
//     alert("Word(s) have been added");
//  } else  {alert("word doesn't exists. Please write another")
//  setTimeout(() => {
//   alert.textContent = ""
// }, 4000)}
// console.log(response)
// }

// async function addWord() {
//   const input = document.querySelector("#addInput").value;
//   const checkData = await fetch (`http://localhost:3000`)
//   const response = await  checkData.json();
 
//   console.log(response)
//   const options = {
//    method: "POST",
//    headers: {
//        "Content-Type": "application/json"
//    },
//    body: JSON.stringify(response)
//  }
//   if (checkData.status == 200){
//    document.querySelector("#addInput").value = "";
//      alert("Word(s) have been added");
//   } else  {alert("word doesn't exists. Please write another")
//   setTimeout(() => {
//    alert.textContent = ""
//  }, 4000)}
//  console.log(response)
//  }
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
  const input = document.querySelector("#input").value;
  inputWord = await randomWord();
  speech.text = `Your word is ${inputWord}`;
  speech.rate = 0.8;
  speech.lang = "en-US";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}
