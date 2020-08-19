let wordP = document.querySelector('#word')
let letters = document.querySelector('#letters')
let form = document.querySelector('form')

//Random word fetched from api
let query = prompt('Enter a theme word')
fetch(`https://api.datamuse.com/words?ml=${query}&max=4`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
