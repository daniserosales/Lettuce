const cors = require("cors");
const express = require("express");
const app = express();
const fullWordList = require("./words.json");

let words = [...fullWordList]

app.use(cors());
app.use(express.json());

const logger = require("./logger");
app.use(logger);


//Welcome page for server
app.get("/", (req, res, next) => {
    res.status(200).send("This is the server for our spelling game.");
});

//Reset words array to the full list to start a new game
app.get("/reset", (req, res, next) => {
    words = [...fullWordList];
    res.sendStatus(200)
})

//List all words in the wordbank
app.get("/words", (req, res, next) => {
    if (words == undefined) {
        res.status(404).send();
        next();
    } else {
        res.send(words);
    }
});

//Send a word from word back randomly
// Return the word itself and the link to the pronouncation file from API
app.get("/random", (req, res) => {

    randIdx = Math.floor(Math.random() * words.length)

    res.status(200).send(words[randIdx])
})

//This function will receive the level requirement via the API endpoint, filter the word bank to keep only the words that matches the level requirement in a shallower copy of the word bank (lvlwords), then pick a random index and return a random word from the lvlwords array.

app.get("/random/:lvl", (req, res) => {

    //save the level in the API endpoint in a variable
    const level = req.params.lvl

    // filter the complete word bank and keep those words meeting the level requirement in variable lvlwords
    const lvlwords = words.filter((word => word.level === level))

    //Generate a random index for the lvlwords array
    //Send the word via response to play the word.
    //Remove it from the words array so that it would not be picked again.
    //If all words in a difficulty is exhausted, send a 404 error.

    randIdx = Math.floor(Math.random() * lvlwords.length);

    if (words.findIndex((element) => (element === lvlwords[randIdx])) !== -1) {
        words.splice(words.findIndex((element) => (element === lvlwords[randIdx])), 1)
        res.status(200).send(lvlwords[randIdx])
    } else {
        res.status(404).send("No more words.")
    }
})


//Add a word to word bank
// app.post("words/addword/:word", (req, res) => {

//     const newWord = req.params.word.toLowerCase(); //New word is defined in API link
//     const id = words.length;
//     words[id] = newWord;

//     res.status(200).send("Success");

// })

// //Delete a word from word bank
// app.delete("words/deleteword/:word", (req, res) => {

//     const deleteWord = req.params.word.toLowerCase();//Delete word is defined in API link

//     const wordIndex = words.findIndex((element) => (element === deleteWord))

//     if (wordIndex === -1) {
//         res.sendStatus(404)
//     } else {
//         words.splice(wordIndex,1)
//         res.sendStatus(204)
//     }
// })

module.exports = app;
