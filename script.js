'use strict';
/** Import */
import harryPotterName from './NamesArray.js';

/**Const */
const btnAll = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.reset');
const divPicture = document.querySelector('.divPicture');
const scoreDOM = document.querySelector('.score');
const level = document.querySelector('.level');

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
  #player = true;

  constructor() {
    this._randInArr(); // rand in arr
    this._init(); // init
    resetBtn.addEventListener('click', this._reset.bind(this)); // rest button
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
    this.idLocal = this.id;

    if (+e.target.dataset.id !== this.idLocal || this.#score <= 0)
      this._incorrect(); // incorrect Answer
    if (+e.target.dataset.id === this.idLocal && this.#score > 0)
      this._correct(); // correct Answer
  }

  _incorrect() {
    if (this.#score >= 1) {
      scoreDOM.textContent = --this.#score;
      this._level(); // Update level
      this._randInArr();
      this._nextQuestion(); // next to the Question
      this._showImg(); // render img
    }

    if (this.#score === 0) {
      scoreDOM.textContent = 'you lose';
      this.#player = false;
    }
  }

  _correct() {
    if (this.#player) {
      scoreDOM.textContent = ++this.#score;

      this._level(); // Update level
      this._randInArr();
      this._nextQuestion(); // next to the Question
      this._showImg(); // render img
    }
  }

  _level() {
    if (this.#score >= 8) return (level.textContent = 'High');
    if (this.#score >= 5) return (level.textContent = 'Normal');
    if (this.#score <= 4) return (level.textContent = 'low');
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
    btnAll.forEach((btn, i) => {
      btn.setAttribute('data-id', this.arr[i]); // Set Attribute [data-id, i]
      btn.innerHTML = harryPotterName[this.arr[i]];
      btn.addEventListener('click', e => this._ButtonHandler(e));
    });

    scoreDOM.textContent = this.#score;
    this._showImg();
  }

  _reset() {
    this.#player = true;
    this.#score = 5;
    scoreDOM.textContent = this.#score;

    this._level(); // Update level
    this._randInArr();
    this._nextQuestion(); // next to the Question
    this._showImg(); // render img
  }
}

new QuizzGame();
