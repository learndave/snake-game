function newGame() {
    resetScreen();
    resetScores();
    play();

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

        function getHighestScore() {
            // TO DO //
            return 1;
        }
    }
}

function play() {
    setInitialSnake();
    isPlaying = true;
    giveFood();
    clearInterval(frame);
    frame = setInterval(nextFrame, FRAME_INTERVAL);

    function setInitialSnake() {
        let screenCenter = Math.floor(SCREEN_RESOLUTION/2);
        snakeBody = [
                        [screenCenter, screenCenter],
                        [screenCenter + 1, screenCenter],
                        [screenCenter + 2, screenCenter],
                        [screenCenter + 3, screenCenter],
                        // [screenCenter, screenCenter - 2],
                        // [screenCenter - 1, screenCenter - 2],
                        // [screenCenter - 2, screenCenter - 2],
                        // [screenCenter - 2, screenCenter - 1],
                        // [screenCenter - 2, screenCenter],
                        // [screenCenter - 2, screenCenter + 1],
                        // [screenCenter - 2, screenCenter + 2],
                        // [screenCenter - 2, screenCenter + 3]
                        
                    ]
        for (let cell_coordinate of snakeBody) {
            let cell = document.querySelector(`.col${cell_coordinate[0]}.row${cell_coordinate[1]}`);
           // cell.innerHTML = `c${cell_coordinate[0]}r${cell_coordinate[1]}`;
            cell.classList.add("snake-cell");
        }
    }
}

function giveFood() {
    foodCol = Math.floor(Math.random() * SCREEN_RESOLUTION) + 1;
    foodRow = Math.floor(Math.random() * SCREEN_RESOLUTION) + 1;
    let foodCell = document.querySelector(`.col${foodCol}.row${foodRow}`) 
    if (foodCell.classList.contains("snake-cell")) {
        giveFood();
    } else {
        foodCell.classList.add("food");
    }
}

function nextFrame() {
    isDirectionToggled = false;
    if (isPlaying) {
        moveSnake();
    }
}

function moveSnake() {
    let oldSnake = JSON.stringify(snakeBody);
    
    let headCol = snakeBody[0][0];
    let headRow = snakeBody[0][1];
    
    growSnake();

    newHead = JSON.stringify(snakeBody[0])

    // check if it hits itself)
    if (oldSnake.indexOf(newHead) != -1) {
        gameOver();
        return;
    }

    let isFoodEaten = false;
    drawNewHead();
    if (isFoodEaten) {
        growSnake();
        growSnake();
        growSnake();
        giveFood();
    } else {
        removeOldTail();
    }

    
    function growSnake() {
        if (snakeDirection == "LEFT") {
            moveSnakeLeft();
        } else if (snakeDirection == "RIGHT") {
            moveSnakeRight();
        } else if (snakeDirection == "UP") {
            moveSnakeUp();
        } else {
            moveSnakeDown();
        }
    }

    function moveSnakeLeft() {
        if (headCol === 1) {
            snakeBody.unshift([SCREEN_RESOLUTION, headRow]);
        } else {
            snakeBody.unshift([headCol - 1, headRow]);
        }
    }

    function moveSnakeRight() {
        if (headCol === SCREEN_RESOLUTION) {
            snakeBody.unshift([1, headRow]);
        } else {
            snakeBody.unshift([headCol + 1, headRow]);
        }
    }

    function moveSnakeUp() {
        if (headRow == SCREEN_RESOLUTION) {
            snakeBody.unshift([headCol, 1]);
        } else {
            snakeBody.unshift([headCol, headRow + 1]);
        }
    }

    function moveSnakeDown() {
        if (headRow == 1) {
            snakeBody.unshift([headCol, SCREEN_RESOLUTION]);
        } else {
            snakeBody.unshift([headCol, headRow - 1]);
        }
    }

    function drawNewHead() {
        let newHead = snakeBody[0];
        let cell = document.querySelector(`.col${newHead[0]}.row${newHead[1]}`);        
        cell.classList.add("snake-cell");

        // when food is eaten
        if (cell.classList[3] == "food") {
            isFoodEaten = true;
            cell.classList.remove("food");
        } else {
            isFoodEaten = false;
        }
    }

    function removeOldTail() {
        let oldTail = snakeBody[snakeBody.length - 1];
        let cell = document.querySelector(`.col${oldTail[0]}.row${oldTail[1]}`);
        cell.classList.remove("snake-cell");
        snakeBody.pop();
    }
}


function changeDirection(e) {
    key = e.key;
    if (!isDirectionToggled) {
        if (key == "ArrowLeft") {
            if (snakeDirection == "RIGHT") {
                return;
            }
            snakeDirection = "LEFT";
        } else if (key == "ArrowRight") {
            if (snakeDirection == "LEFT") {
                return;
            }
            snakeDirection = "RIGHT";
        } else if (key == "ArrowUp") {
            if (snakeDirection == "DOWN") {
                return;
            }
            snakeDirection = "UP";
        } else if (key == "ArrowDown") {
            if (snakeDirection == "UP") {
                return;
            }
            snakeDirection = "DOWN";
        }
        isDirectionToggled = true;
    }
}



function gameOver() {
    isPlaying = false;
}

/* GLOBAL OBJECTS */

const SCREEN_RESOLUTION = 36;
const box = document.querySelector(".box");
const highScore = document.querySelector(".high.scores");
const currentScore = document.querySelector(".current.scores");
const FRAME_INTERVAL = 100; // in milliseconds (ms)


let frame, isDirectionToggled, isPlaying;
let snakeBody = []; // coordinates of snake body's cells, from head to tail
let snakeDirection = "LEFT";
let snakeLength = 2;
 
document.onkeydown = (e) => changeDirection(e);

newGame();

