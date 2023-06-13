
const button = document.querySelector("#audiobutton");

button.addEventListener('click', playAudioFile)

const apikey = "d7b02178-0006-4d8e-8219-97376db15ec4";
const input = "treble"
const endpoint = `https://media.merriam-webster.com/audio/prons/en/us/mp3/t/treble01.mp3`
const reqURL= `https://www.dictionaryapi.com/api/v3/references/sd3/json/treble?key=${apikey}`
async function playAudioFile(e) {
    try {
    const repsData  = await fetch (endpoint)
    
    
    if (repsData.ok) {
        const data = await repsData.json();
        console.log(data)
        
        (data);
    } else {
        throw "Something has gone wrong with one of the API requests";
    }
    }
     catch (e) {
    console.log(e);
    }
    }
