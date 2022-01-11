'use strict';
/** Import */
import harryPotterName from './NamesArray.js';

/**Const */
const btnAll = document.querySelectorAll('.btn');
const divPicture = document.querySelector('.divPicture');
const scoreDOM = document.querySelector('.score');

/** Function */
const randFunction = function () {
  return Math.floor(Math.random() * state.randomNumArr.length);
};

const showImg = function () {
  divPicture.innerHTML = ` 
  <img class="rounded mx-auto d-block" src="images/Players/${id}.jpg" />
`;
};

const nextQuestion = function () {
  btnAll.forEach((btn, i) => {
    btn.removeAttribute('data-id');
    btn.setAttribute('data-id', arr[i]); // Set Attribute [data-id, i]
    btn.innerHTML = harryPotterName[arr[i]];
  });
};

let [...arr] = state.randomNumArr[randFunction()]; // array Destructuring
let randInArr = Math.floor(Math.random() * 4); // rand in arr [0,2,3,4] = rand [2]
let id = arr.at(randInArr); // Slice

btnAll.forEach(function (btn, i) {
  btn.setAttribute('data-id', arr[i]); // Set Attribute [data-id, i]
  btn.innerHTML = harryPotterName[arr[i]];

  btn.addEventListener('click', function (e) {
    const link = e.target;

    if (+link.dataset.id !== id || state.score <= 0) {
      scoreDOM.textContent = state.score <= 0 ? 'you lose' : --state.score;
      [...arr] = state.randomNumArr[randFunction()];
      randInArr = Math.floor(Math.random() * 4); // rand in arr [0,2,3,4] = rand [2]
      id = arr.at(randInArr); // Slice
      nextQuestion(); // next to the Question
      showImg(); // render img
    }

    if (+link.dataset.id === id && state.score > 0) {
      scoreDOM.textContent = ++state.score;

      [...arr] = state.randomNumArr[randFunction()];
      randInArr = Math.floor(Math.random() * 4); // rand in arr [0,2,3,4] = rand [2]
      id = arr.at(randInArr);
      nextQuestion(); // next to the Question
      showImg(); // render img
    }
  });
});

const init = function () {
  scoreDOM.textContent = state.score;
  showImg();
};
init();
