let wordP = document.querySelector('#word')
let letters = document.getElementById('letters')
let form = document.querySelector('form')
let theme = document.querySelector('#theme')
let img = document.querySelector('img')
let retryLabel = document.querySelector('#badGuess')
let query = document.querySelector("#query")
let startBtn = document.querySelector('#startBtn')
let startModal = document.querySelector('.wrapper')
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
      console.log(raw)
      if (raw.length > 0) {
        data = raw
        splitStr()
    } else {
        console.log(query)
        query = prompt("That word returned no results!")
        fetchWords()
    }})
    .catch(err => console.error(err));
}
//splits the word into an array and displays hidden characters
function splitStr() {
  wordArr = data[0].word.split("")
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
  if (!checkLetters(e.target[0].value)) {
    //search for the letter in the array
    wordArr.forEach((item, i) => {
      if (wordArr[i] === e.target[0].value.toLowerCase()) {
        console.log(wordP.innerText)
        wordP.innerText = replaceAt(wordP.innerText, i, wordArr[i])
        //the letter has been replaced at the specified index
        replace = true
      }
    });
    if (!replace) {
      letters.innerText += e.target[0].value
      score++
    }
  } else {
    retryLabel.style.display="inline"
  }
  e.target[0].value = ""
  replace = false
  checkScore()
}

//function to check the list of previous guesses
function checkLetters(value) {
  //if none of the letters in the string match, it returns false
  let contains = false
  letters.innerText.split('').forEach((item, index)=>{
    if (item === value) {
      noContain = true
      return true
    }
  })
  return contains
}

function checkWord() {
  if (wordP.innerText === data[0].word) {
    winModal.style.display = "block"
  }
}

function checkScore() {
  img.src = `./assets/img${score}.png`
  if (score >= 6) {
    loseModal.style.display = "block"
  }
}
// utility function to change strings at a specific index, this is used a lot
replaceAt = function(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
