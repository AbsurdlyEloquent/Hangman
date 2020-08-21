let wordP = document.querySelector('#word')
let letters = document.querySelector('#letters')
let form = document.querySelector('form')
let theme = document.querySelector('#theme')
let wordArr = []
let data = []

//Random word fetched from api
let query = prompt('Enter a theme word')
fetchWords()
function fetchWords() {
  fetch(`https://api.datamuse.com/words?ml=${query}&max=4`)
    .then(response => response.json())
    .then(raw => {
      console.log(raw)
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
  wordArr = data[0].word.split("")
  wordP.innerText = "_".repeat(wordArr.length)
  theme.innerText = theme.innerText + " " + query
}

//adds event listener to the form
form.addEventListener('submit', handler)
function handler(e) {
  e.preventDefault()
  // if the letter isn't in the letters array
  if (checkLetters(e.target[0].value)) {
    wordArr.forEach((item, i) => {
      if (wordArr[i] === e.target[0].value.toLowerCase()) {
        console.log(wordP.innerText)
        wordP.innerText = replaceAt(wordP.innerText, i, wordArr[i])
    //    var replace = true
      } else {
          if (checkLetters(e.target[0].value) && replace === true) {
            letters.innerText += e.target[0].value
          }
      }
    });
  }
}

//function to check the list of previous guesses
function checkLetters(value) {
  if (!function() {for (let i = 0; i < letters.innerText.length; i++) {
    return letters.innerText[i] === value.toUpperCase
    }}) {
      return true
  } else {
    return false
  }
}
// utility function to change strings at a specific index, this is used a lot
replaceAt = function(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
