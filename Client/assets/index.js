

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
  inputWord = await randomWord("begin");

  if (inputWord != -1) {
    speech.text = `Your word is ${inputWord}`;
    speech.rate = 0.8;
    speech.lang = "en-US";
    speech.volume = 1;

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

    window.speechSynthesis.speak(speech);
    swapEnable()
  }
}

async function checkSpelling() {
  const input = document.querySelector("#input").value.toLowerCase();

  if (input == inputWord) {
    const defi = document.querySelector('#message');
    defi.style.color = "green";
    defi.innerHTML = "Legend!"
  } else if (input != inputWord) {
    const defi = document.querySelector('#message');
    defi.style.color = "red";
    defi.innerHTML = `Ooops!  The correct spelling is ${inputWord}`;
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
