const cors = require("cors");
const express = require("express");
const app = express();
const words = require("./words.json");

app.use(cors());
app.use(express.json());

const logger = require("./logger");
app.use(logger);


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
}});

//Send a word from word back randomly
// Return the word itself and the link to the pronouncation file from API
app.get("/random", (req, res) => {

    randIdx =  Math.floor(Math.random() * words.length)

    //Retrieve pronouncation of the word via API

    res.status(200).send(words[randIdx])
})

//This function will receive the level requirement via the API endpoint, filter the word bank to keep only the words that matches the level requirement in a shallower copy of the word bank (lvlwords), then pick a random index and return a random word from the lvlwords array.

app.get("/random/:lvl", (req, res) => {

    //save the level in the API endpoint in a variable
    const level = req.params.lvl

    // filter the complete word bank and keep those words meeting the level requirement in variable lvlwords
    const lvlwords = words.filter((word => word.level === level))

    //Generate a random index in the lvlwords array
    randIdx = Math.ceil(Math.random() * lvlwords.length);

    //return the word in response
    res.status(200).send(lvlwords[randIdx])
})


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
