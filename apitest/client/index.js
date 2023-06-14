
const button = document.querySelector("#audiobutton");
console.log(button)

button.addEventListener('click', playAudioFile)

const apikey = "d7b02178-0006-4d8e-8219-97376db15ec4";
const input = "treble"
const endpoint = `./audio`
const reqURL= `https://www.dictionaryapi.com/api/v3/references/sd3/json/${input}?key=${apikey}`
async function playAudioFile(e) {
    try {
    const repsData  = await fetch (reqURL)
    
    
    if (repsData.ok) {
        const data = await repsData.json();
        console.log(data)
        
        (data);
    } else {
        throw "Something has gone wrong with one of the API requests";
    }
    }
     catch (e) {
    console.log();
    }
    }
