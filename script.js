function newGame() {
    resetScreen();
    resetScores();
    play();
}

function resetScreen() {
    box.innerHTML = "";
    box.style.gridTemplateColumns = `repeat(${SCREEN_RESOLUTION},1fr)`;

    for (let r = 1; r <= SCREEN_RESOLUTION; r++) {
        for (let c = SCREEN_RESOLUTION; c >= 1 ; c--) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add(`col${c}`);
            cell.classList.add(`row${r}`);
            box.prepend(cell);
        }
    }
}

function resetScores() {
    currentScore.innerHTML = 0;
    highScore.innerHTML = getHighestScore();
}

function getHighestScore() {
    // TO DO //
    return 1;
}

function play() {
    setInitialSnake();
    clearInterval(frame);
    frame = setInterval(nextFrame, FRAME_INTERVAL);
}

function setInitialSnake() {
    let screenCenter = Math.floor(SCREEN_RESOLUTION/2);
    snakeBody = [
                    [screenCenter, screenCenter],
                    [screenCenter + 1, screenCenter]
                ]
    console.log(snakeBody);
    for (let cell_coordinate of snakeBody) {
        let cell = document.querySelector(`.col${cell_coordinate[0]}.row${cell_coordinate[1]}`);
        cell.classList.add("snake-cell");
    }
}

function nextFrame() {
    if (TEMP_count > 0) {
        moveSnake();
        TEMP_count++;
    }
}

function moveSnake() {
    let headCol = snakeBody[0][0];
    let headRow = snakeBody[0][1];
    if (snakeDirection == "LEFT") {
        moveSnakeLeft();
    } else if (snakeDirection = "RIGHT") {

    }
    drawNewHead();
    removeOldTail();

    function moveSnakeLeft() {
        if (headCol === 1) {
            snakeBody.unshift([SCREEN_RESOLUTION, headRow]);
        } else {
            snakeBody.unshift([headCol - 1, headRow]);
        }
    }

    function drawNewHead() {
        let newHead =  snakeBody[0];
        let cell = document.querySelector(`.col${newHead[0]}.row${newHead[1]}`);
        cell.classList.add("snake-cell");
    }

    function removeOldTail() {
        let oldTail = snakeBody[snakeBody.length - 1];
        let cell = document.querySelector(`.col${oldTail[0]}.row${oldTail[1]}`);
        cell.classList.remove("snake-cell");
        snakeBody.pop();
    }
}

/* GLOBAL OBJECTS */
const SCREEN_RESOLUTION = 20;
const box = document.querySelector(".box");
const highScore = document.querySelector(".high.scores");
const currentScore = document.querySelector(".current.scores");
const FRAME_INTERVAL = 400; // in milliseconds (ms)

let snakeBody = []; // coordinates of snake body's cells, from head to tail
let snakeDirection = "LEFT";
let snakeLength = 2;
let frame;
let TEMP_count = 10;

newGame();

