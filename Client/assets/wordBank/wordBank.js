let words = []; 

// Function to fetch the words data from the JSON file
function fetchWords() {
  fetch('./words.json')
    .then(response => response.json())
    .then(data => {
      words = data; // Assign the fetched data to the words variable
      console.log(words); // Verify the data
    })
    .catch(error => console.error(error));
}

// Load the word list
fetchWords();

// const words = require("./words.json")

const deleteform = document.querySelector("#delete-form");
deleteform.addEventListener("submit", deleteWord);

//The deleteWord function will:
// 1. Receive input from a textbox with ID "input"
// 2. Display the result of the deletion in the textcontent of a element (say a <p> tag) with ID "message"
// 3. Update the array which holds the information read from words.json.
// 4. It will not write the update to words.json, so the deletion will not carry forward once wordBank.html is refreshed.

function deleteWord(e) {

    e.preventDefault();

    const word = e.target.input.value //collect the value of textbox ID input from html
    const message = document.querySelector("#message") // message box ID for displaying results

    const wordIndex = words.findIndex((element) => (element.word === word))

    if (wordIndex === -1) {
        e.target.input.value = "";
        message.textContent = "Word do not exist in word bank."
        setTimeout(() => {
            message.textContent = ""
        }, 2000)

        console.log(words)
    } else {
        words.splice(wordIndex, 1)
        e.target.input.value = "";
        message.textContent = "Word deleted successfully."
        setTimeout(() => {
            message.textContent = ""
        }, 2000)

        console.log(words)
    }
}
