const audioElement = document.getElementById('audio');
// VoiceRSS Javascript SDK
const languageType = 'en-us';
const apiKey_voicer = '1e717e8fcf754898b1ac1b76a98efe70'; 

const button = document.getElementById('button');
// const joke = document.getElementById('joke');

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
    VoiceRSS.speech({ 
        key: apiKey_voicer,
        src: joke,
        hl: languageType,
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

//Get joke from Joke API
const getJokes = async () => {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = ``;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();    
       if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
       } else {
        joke = data.joke;
       }
       tellMe(joke);
    } catch (err) {

    }
}

button.addEventListener('click', getJokes);

audioElement.addEventListener('play', () => {
    button.disabled = true;
});

audioElement.addEventListener('ended', () => {
    button.disabled = false;
});

audioElement.addEventListener('pause', () => {
    button.disabled = false;
});