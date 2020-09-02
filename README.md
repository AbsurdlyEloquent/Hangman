# Hangman
## *It's actually a pretty horrifying game but don't think about it*

This is a frontend game coded entirely in vanilla JavaScript, HTML and CSS.

The game generates a word to guess from based off of a theme word you enter into a Modal at the beginning. It does this by querying [this api](https://www.datamuse.com/api/) for a word.

The logic of the game is fairly straightforward. The word is split into an array, when a letter is guessed, it checks for that letter in the array. `if` it is found, the letter switches out in the array and onscreen with my `replaceAt()` function. `else`, it goes into the guessed letters array.

There are several modals that are only visible at certain times, the Start Modal, Win Modal and Lose Modal, They each denote game states.

When a letter is guessed wrong AND it hasn't been guessed before, the image to the right switches out for a new one showing a more complete 'hangman'.
I actually couldn't find a suitable set of images so I drew these myself in Gimp.


I'm very proud of my `replaceAt()` function:

```js
replaceAt = function(str, index, replacement) {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}
```
It takes a string, the index you want to replace, and a replacement. The string is split and concatenated back together at the index specified.
