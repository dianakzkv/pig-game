'use strict';

const score0_el = document.getElementById('score--0');
const score1_el = document.getElementById('score--1');
const currentScore0_el = document.getElementById('current--0');
const currentScore1_el = document.getElementById('current--1');
const dice_el = document.querySelector('.dice');

const player0_el = document.querySelector('.player--0');
const player1_el = document.querySelector('.player--1');

const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const buttonInfo = document.querySelector('.btn--info');

score0_el.textContent = 0;
score1_el.textContent = 0;

dice_el.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;

buttonRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  dice_el.classList.remove('hidden');
  dice_el.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    player0_el.classList.toggle('player--active');
    player1_el.classList.toggle('player--active');
  }
});
buttonInfo.addEventListener('click', function () {});
