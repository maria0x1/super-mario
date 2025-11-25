'use strict';

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const startScreen = document.querySelector('#start-screen');
const playButton = document.querySelector('#play-button');
const restartButton = document.querySelector('#restart-button');
const downButton = document.querySelector('#down-button');

const scoreValueElement = document.querySelector('#score-value');
const gameOverScreen = document.querySelector('#game-over-screen');
const finalScoreElement = document.querySelector('#final-score');

let gameLoop = null;
let gameStarted = false;
let scoreValue = 0;
let scoreInterval = null;

const startGame = () => {
    if (gameStarted) return;

    gameStarted = true;
    startScreen.style.display = 'none';

    pipe.classList.add('running');
    clouds.classList.add('running');

    scoreValue = 0;
    scoreValueElement.textContent = '00000';
    scoreInterval = setInterval(updateScore, 100);

    gameLoop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;

        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
            clearInterval(scoreInterval);
            clearInterval(gameLoop);

            finalScoreElement.textContent = scoreValue;
            gameOverScreen.style.display = 'flex';
            gameStarted = false;
        }
    }, 10);
};

const jump = () => {
    if (!gameStarted) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const updateScore = () => {
    scoreValue++;
    scoreValueElement.textContent = String(scoreValue).padStart(5, '0');
};

function resetGame() {
    window.location.reload();
}

playButton.addEventListener('click', startGame);

restartButton.addEventListener('click', resetGame);

downButton.addEventListener('click', jump);


document.addEventListener('keydown', (event) => {

    switch (event.code) {

        case 'Enter':
            startGame();
            break;

        case 'Space':
        case 'ArrowUp':
            jump();
            break;

        case 'KeyR':
            resetGame();
            break;

        case 'ArrowDown':
            jump();
            break;
    }
});