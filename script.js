let wordP = document.querySelector('#word')
let lettersP = document.getElementById('letters')
let letters = []
let form = document.querySelector('form')
let theme = document.querySelector('#theme')
let img = document.querySelector('img')
let retryLabel = document.querySelector('#badGuess')
let query = document.querySelector("#query")
let startBtn = document.querySelector('#startBtn')
let startModal = document.querySelector('.wrapper')
let winModal = document.querySelector('#winModal')
let loseModal = document.querySelector('#loseModal')
let wordArr = []
let data = []
let score = 0

// Event listener to fetch word
startBtn.addEventListener('click', fetchWords)
//Random word fetched from api
function fetchWords() {
  startModal.style.display = 'none'
  fetch(`https://api.datamuse.com/words?ml=${query.value}&max=1`)
    .then(response => response.json())
    .then(raw => {
      if (raw.length > 0) {
        data = raw
        splitStr()
    } else {
        query = prompt("That word returned no results!")
        fetchWords()
    }})
    .catch(err => console.error(err));
}
//splits the word into an array and displays hidden characters
function splitStr() {
  wordArr = data[0].word.toUpperCase().split("")
  wordP.innerText = "_".repeat(wordArr.length)
  theme.innerText = theme.innerText + " " + query.value
}

//adds event listener to the form
let replace = false
//this doesn't work if its not a global variable
form.addEventListener('submit', handler)
function handler(e) {
  e.preventDefault()
  retryLabel.style.display = 'none'
  // if the letter isn't in the letters array
  if (!letters.includes(e.target[0].value.toUpperCase())) {
    //search for the letter in the array
    wordArr.forEach((item, i) => {
      if (wordArr[i] === e.target[0].value.toUpperCase()) {
        console.log(wordP.innerText)
        wordP.innerText = replaceAt(wordP.innerText, i, wordArr[i])
        //the letter has been replaced at the specified index
        replace = true
      }
    });
    if (!replace) {
      letters.push(e.target[0].value.toUpperCase())
      lettersP.innerText = letters
      score++
      checkScore()
    }
  } else {
    retryLabel.style.display="inline"
  }
  e.target[0].value = ""
  replace = false
  checkWord()
}


function checkWord() {
  if (wordP.innerText === data[0].word.toUpperCase()) {
    winModal.style.display = "flex"
  }
}

function checkScore() {
  img.src = `./assets/img${score}.png`
  if (score >= 6) {
    loseModal.style.display = "flex"
  }
}
// utility function to change strings at a specific index, this is used a lot
replaceAt = function(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
