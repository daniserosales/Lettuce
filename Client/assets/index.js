

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
listenBtn.addEventListener("click", listenWord)//addDef);
checkBtn.addEventListener("click", checkSpelling);
//resetBtn.addEventListener("click", function () {
// location.reload();
//});

/// My new Code to disable the textbox, check button and end game button on load

document.querySelector("#input").disabled = true
checkBtn.disabled = true
// End game button

document.querySelector("#input").style.filter = "grayscale(100%)"
checkBtn.style.filter = "grayscale(100%)"
checkBtn.style.opacity = "1"

/// End of my new code

async function randomWord() {
  const response = await fetch("http://localhost:3000/random");
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
// async function addDef() {
//   const input = await inputWord;
//     try {
//     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
//     const data = await response.json();
//     console.log(data)
//     const def = await data.meanings.definitions.definition;
//     document.getElementById('definition').innerText = def;

//   } catch (error) {
//     // Handle any errors that occur during the API request
//     console.log('An error occurred:', error);
//   }
// } 

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
  speech.lang = "en";
  speech.volume = 1;

  window.speechSynthesis.speak(speech);

  swapEnable();

}

// This function will swap enabling/disabling two groups of elements in the HTML so that they are mutually exclusive
// Group 1: textbox, Check button and End Game button
// Group 2: The three difficulty select button
function swapEnable() {

  const textbox = document.querySelector("#input")

  const elements = [listenBtn, textbox, checkBtn]
  // Still need to add the other three elements, intermediate and hard wards button, and end game button

  for (let i = 0; i < elements.length; i++) {

    elements[i].disabled = !elements[i].disabled

    if (elements[i].style.filter === "") {
      elements[i].style.filter = "grayscale(100%)"
    } else {
      elements[i].style.filter = ""
    }

    if (elements[i].style.opacity === "1") {
      elements[i].style.opacity = "0.3"
    } else if (elements[i].style.opacity === "0.3") {
      elements[i].style.filter = "1"
    }
  }

}
