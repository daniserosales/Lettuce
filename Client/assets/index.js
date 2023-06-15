

const beginnerBtn = document.querySelector("#beginner");
const intermediateBtn = document.querySelector("#intermediate");
const hardBtn = document.querySelector("#hard");
const checkBtn = document.querySelector("#submit-word");
// const resetBtn = document.querySelector("#resetBtn");
const inputTextBox = document.querySelector("#input")
const endGameBtn = document.querySelector("#end-game")
const playAgainBtn = document.querySelector("#new-game")

const speech = new SpeechSynthesisUtterance();
let inputWord;
let score = 0;
let allScore = 0;
let message = document.querySelector("#message");
let arrIncorrectWords = [];
let lvlDifficulty;
let scoreCard = document.querySelector("#popup");
let displayScore = document.querySelector("#displayScore");
// addWords.addEventListener("click", addWord);
// listenBtn.addEventListener("click", listenWord );
beginnerBtn.addEventListener("click", addDefBeg)
intermediateBtn.addEventListener("click", addDefInter);
hardBtn.addEventListener("click", addDefHar);
checkBtn.addEventListener("click", checkSpelling);
endGameBtn.addEventListener("click", endGame)
playAgainBtn.addEventListener("click", playAgain)

//resetBtn.addEventListener("click", function () {
// location.reload();
//});

// Disable the textbox, check button and end game button on load
inputTextBox.classList.add("disabled")
checkBtn.classList.add("disabled")

async function randomWord(level) {

  switch (level) {
    case "begin":
      response = await fetch("http://localhost:3000/random/easy");
      break;
    case "inter":
      response = await fetch("http://localhost:3000/random/inter");
      break;
    case "hard":
      response = await fetch("http://localhost:3000/random/hard");
      break;
  }

  //Introduce error check to catch word list empty error
  if (response.status === 200) {
    const data = await response.json();
    return data.word.toLowerCase()
  } else if (response.status === 404) {
    alert(`No more words from this difficulty. Please choose another difficulty.`);
    switch (level) {
      case "begin":
        beginnerBtn.classList.add("perm-disabled")
        return -1
      case "inter":
        intermediateBtn.classList.add("perm-disabled")
        return -1
      case "hard":
        hardBtn.classList.add("perm-disabled")
        return -1
    }
  } else {
    alert(`Network error. Please try again.`);
    return -1
  }

}

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
  inputWord = await randomWord("begin");

  if (inputWord != -1) {
    speech.text = `Your word is ${inputWord}`;
    speech.rate = 0.8;
    speech.lang = "en-US";
    speech.volume = 1;
    document.querySelector("#input").focus();
    lvlDifficulty = "begin";

    window.speechSynthesis.speak(speech);
    swapEnable()
  }
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
  inputWord = await randomWord("inter");

  if (inputWord != -1) {
    speech.text = `Your word is ${inputWord}`;
    speech.rate = 0.8;
    speech.lang = "en-US";
    speech.volume = 1;

    document.querySelector("#input").focus();
    lvlDifficulty = "inter";

    window.speechSynthesis.speak(speech);
    swapEnable()
  }
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
  inputWord = await randomWord("hard");

  if (inputWord != -1) {
    inputWord = await randomWord("hard");
    speech.text = `Your word is ${inputWord}`;
    speech.rate = 0.8;
    speech.lang = "en-US";
    speech.volume = 1;

    document.querySelector("#input").focus();
    lvlDifficulty = "hard";

    window.speechSynthesis.speak(speech);
    swapEnable()
  }
}

async function checkSpelling() {
  const input = document.querySelector("#input").value.toLowerCase();

  if (input == inputWord) {
    const defi = document.querySelector('#message');
    defi.style.color = "green";
    defi.style.color = "green";
    defi.innerHTML = "Legend!"
    inputTextBox.value = ""
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
    
  } else if (input != inputWord) {
    const defi = document.querySelector('#message');
    defi.style.color = "red";
    inputTextBox.value = ""
    defi.innerHTML =`Ooops!  The correct spelling is ${inputWord}`;
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
     
     setTimeout(() => {
      const defi = document.querySelector('#message');
      defi.innerHTML = '';
    }, 5000);

  swapEnable()
}


function swapEnable() {

  const elements = [beginnerBtn, intermediateBtn, hardBtn, inputTextBox, checkBtn]

  for (let i = 0; i < elements.length; i++) {

    const element = elements[i]

    if (element.classList.contains("disabled")) {
      element.classList.remove("disabled");
    } else {
      element.classList.add("disabled");
    }
  }
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

async function  playAgain () {
  // const defi = document.querySelector('#endImg');
  // defi.src = "Play Again@3x.png";
  // document.getElementById("endImg").style.width = "700px"
  // document.getElementById("endImg").style.height = "300px"
  // document.body.appendChild(defi);
location.reload()
window.scrollTo(0, 0);
scoreCard.classList.remove("open-popup");
   
}
