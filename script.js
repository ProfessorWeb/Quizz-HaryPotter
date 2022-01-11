'use strict';
/** Import */
import harryPotterName from './NamesArray.js';

/**Const */
const btnAll = document.querySelectorAll('.btn');
const divPicture = document.querySelector('.divPicture');
const scoreDOM = document.querySelector('.score');

class QuizzGame {
  /*settings */
  #randomNumArr = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [9, 10, 11, 8],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
  ];

  #score = 5;

  constructor() {
    this.arr = this.#randomNumArr[this._rand()]; // array Destructuring
    this.randInArr = Math.floor(Math.random() * 4); // rand in arr [0,2,3,4] = rand [2]
    this.id = this.arr.at(this.randInArr); // Slice

    btnAll.forEach((btn, i) => {
      btn.setAttribute('data-id', this.arr[i]); // Set Attribute [data-id, i]
      btn.innerHTML = harryPotterName[this.arr[i]];
      btn.addEventListener('click', e => this._ButtonHandler(e));
    });

    this._init();
  }

  _rand() {
    return Math.floor(Math.random() * this.#randomNumArr.length);
  }

  _randInArr() {
    this.arr = this.#randomNumArr[this._rand()];
    this.randInArr = Math.floor(Math.random() * 4); // rand in arr [0,2,3,4] = rand [2]
    this.id = this.arr.at(this.randInArr); // Slice
  }

  _ButtonHandler(e) {
    console.log('asd');
    this.idLocal = this.id;

    if (+e.target.dataset.id !== this.idLocal || this.#score <= 0)
      this._incorrect(); // incorrect Answer
    if (+e.target.dataset.id === this.idLocal && this.#score > 0)
      this._correct(); // correct Answer
  }

  _incorrect() {
    console.log('_incorrect');
    scoreDOM.textContent = this.#score <= 0 ? 'you lose' : --this.#score;

    this._randInArr();
    this._nextQuestion(); // next to the Question
    this._showImg(); // render img
  }

  _correct() {
    console.log('_correct');
    scoreDOM.textContent = ++this.#score;

    this._randInArr();
    this._nextQuestion(); // next to the Question
    this._showImg(); // render img
  }

  _nextQuestion() {
    btnAll.forEach((btn, i) => {
      btn.removeAttribute('data-id');
      btn.setAttribute('data-id', this.arr[i]); // Set Attribute [data-id, i]
      btn.innerHTML = harryPotterName[this.arr[i]];
    });
  }

  _showImg() {
    divPicture.innerHTML = `
      <img class="rounded mx-auto d-block" src="images/Players/${this.id}.jpg" />
    `;
  }

  _init() {
    scoreDOM.textContent = this.#score;
    this._showImg();
  }
}

new QuizzGame();
