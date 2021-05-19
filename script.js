'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score, activePlayer, playing, scores;

function reset() {
  diceEl.classList.add('hidden');
  score = 0;
  activePlayer = 0;
  playing = true;
  score = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  scores = [0, 0];
}

reset();

btnroll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      score += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = score;
    } else {
      changePlayer();
    }
  }
});

function changePlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  score = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnhold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += score;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      changePlayer();
    }
  }
});

btnnew.addEventListener('click', reset);
