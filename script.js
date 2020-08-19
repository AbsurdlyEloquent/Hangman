let wordP = document.querySelector('#word')
let letters = document.querySelector('#letters')
let form = document.querySelector('form')
let theme = document.querySelector('#theme')
let data;

//Random word fetched from api
let query = prompt('Enter a theme word')
fetch(`https://api.datamuse.com/words?ml=${query}&max=4`)
  .then(response => response.json())
  .then(raw => {
    data = raw
    splitStr()
  })
  .catch(err => console.error(err));

//splits the word into an array and displays hidden characters
function splitStr(i=0) {
  let wordArr = data[i].word.split("")
  wordP.innerText = "_ ".repeat(wordArr.length)
  theme.innerText = theme.innerText + " " + query
}
