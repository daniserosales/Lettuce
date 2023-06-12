const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const logger = require("./logger");
app.use(logger);

const words = require("./words.json")

//Welcome page for server
app.get("/", (req, res, next) => {
    res.status(200).send("This is the server for our spelling game.");
});

//List all words in the wordbank
app.get("/words", (req, res, next) => {
    if (words == undefined) {
        res.status(404).send();
        next();
        } else {
        res.send(words);
});

//Send a word from word back randomly
// Return the word itself and the link to the pronouncation file from API
app.get("/random", (req, res) => {

    randIdx = Math.ceil(Math.random() * words.length);

    //Retrieve pronouncation of the word via API

    res.status(200).send(words[randIdx])
})

//Check if the spelling of a word is correct
//params: the word in the question and the spelling the user provides, return a true/false value

app.post("/words/check", (req,res) => {

    const wordTested = req.body.tested //Word being tested, param name defined by frontend
    const wordSpelling = req.body.spelling //Spelling inputed by user. Name defined by frontend

    console.log(wordTested, wordSpelling)

    //if spelling is correct, send true, else send false
    if (wordTested.toLowerCase() === wordSpelling.toLowerCase()) {
        res.status(200).send(true)
    } else {
        res.status(200).send(false)
    }
}) 

//Add a word to word bank
app.post("words/addword/:word", (req, res) => {

    const newWord = req.params.word.toLowerCase(); //New word is defined in API link
    const id = words.length;
    words[id] = newWord;

    res.status(200).send("Success");

})

//Delete a word from word bank
app.delete("words/deleteword/:word", (req, res) => {
    
    const deleteWord = req.params.word.toLowerCase();//Delete word is defined in API link
    
    const wordIndex = words.findIndex((element) => (element === deleteWord))

    if (wordIndex === -1) {
        res.sendStatus(404)
    } else {
        words.splice(wordIndex,1)
        res.sendStatus(204)
    }
})

module.exports = app;
