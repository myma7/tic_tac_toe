const mainBoard = document.querySelector(".main-board");
const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");
const startCells = ["","","","","","","","",""];
let go = "circle";

info.textContent = "Circle first!!";

function createBoard() {
    startCells.forEach((_,index) => {
        cellElement = document.createElement("div");
        cellElement.classList.add('square');
        cellElement.id = index;

        const numberElement = document.createElement("span");
        numberElement.classList.add('square-number');
        cellElement.appendChild(numberElement);

        cellElement.addEventListener("click", addGo)
       

        gameBoard.append(cellElement);
    });
}

createBoard();

function addGo (e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);

    e.target.appendChild(goDisplay);
    
    go = go === "circle" ? "cross":"circle";
    info.textContent = "It is now " + go + "'s go!";
    e.target.removeEventListener("click", addGo);
    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombos.forEach(array => {
        const [a, b, c] = array;
        const squareA = allSquares[a];
        const squareB = allSquares[b];
        const squareC = allSquares[c];

        const isCircleWin = squareA.querySelector('.circle') &&
                            squareB.querySelector('.circle') &&
                            squareC.querySelector('.circle');
        
        const isCrossWin = squareA.querySelector('.cross') &&
                           squareB.querySelector('.cross') &&
                           squareC.querySelector('.cross');
        
        if (isCircleWin) {
            info.textContent = "Circle Wins! 🎉";
            disableClicks();
            launchConfetti(); 
        } else if (isCrossWin) {
            info.textContent = "Cross Wins! 🎉";
            disableClicks();
            launchConfetti(); 
        }
    });
}
function disableClicks() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(square => square.removeEventListener("click", addGo));
}

function launchConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) { 
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 3000); 
}

function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}