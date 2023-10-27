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

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0_el.textContent = 0;
  score1_el.textContent = 0;

  currentScore0_el.textContent = 0;
  currentScore1_el.textContent = 0;

  player0_el.classList.remove('player--winner');
  player1_el.classList.remove('player--winner');

  player0_el.classList.add('player--active');
  player1_el.classList.remove('player--active');

  dice_el.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0_el.classList.toggle('player--active');
  player1_el.classList.toggle('player--active');
};

buttonRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    dice_el.classList.remove('hidden');
    dice_el.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      dice_el.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);

const closeModal = function () {
  document.querySelector(`.modal`).classList.add('hidden');
  document.querySelector(`.overlay`).classList.add('hidden');
};

buttonInfo.addEventListener('click', function () {
  document.querySelector(`.modal`).classList.remove('hidden');
  document.querySelector(`.overlay`).classList.remove('hidden');
});

document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.overlay').addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'Escape' &&
    !document.querySelector(`.modal`).classList.contains('hidden')
  ) {
    closeModal();
  }
});
