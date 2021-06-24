document.addEventListener("DOMContentLoaded", () => {
const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll('.grid div'))
const ScoreDisplay = document.querySelector("#score");
const StartBtn = document.querySelector("#start-button");
const width = 10;
let nextRandom = 0;


const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
];

const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0

//randomly select a tetro and it's first rotation
let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]

//draw the tetro
function draw() {
    current.forEach(index => {
        squares [currentPosition + index].classList.add('tetromino')
    })
}



//undraw the tetro
function undraw(){
    current.forEach(index =>{
        squares[currentPosition + index].classList.remove('tetromino')
    })
}

// TIME AND INTERVALS
//make the tetro move down every second
timerId = setInterval(moveDown, 1000)

//assign function to keyCodes
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    } else if (e.keyCode === 38) {
        rotate()
    } else if  (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode  === 40) {
        moveDown()
    }
}
document.addEventListener('keyup', control)

//Move down function
function moveDown(){
    undraw()
    currentPosition += width
    draw()
    freeze()
} 

//freeze function
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start the fall of new tetro
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
    }   
}

//move the tetro left unless is at the edge or there is a block

function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition +index)% width === 0)
    
    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
    }

    draw()
}

//move the tetro right, unless is at the edge or there is a block
function moveRight() {
    undraw()
    const isAtTheRightEdge = current.some(index => (currentPosition + index)% width === width -1)

    if(!isAtTheRightEdge) currentPosition +=1
    
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
    }

    draw()

}

//rotate the tetro
function rotate() {
    undraw()
    currentRotation ++
    if( currentRotation === current.length) { //if the current rotation gets to 4, make it go back
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

//show-up next tetro in the mini-grid ScoreDisplay
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0


// the tetro without rotation 
const upNextTetrominoes =[
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
]

//display the shape in the mini-grid
function displayShape() {
    //remove any trace of a tetromino from the entire grid
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
    })
    
}


})
