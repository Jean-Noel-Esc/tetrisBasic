document.addEventListener("DOMContentLoaded", () => {
const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll('.grid div'))
const ScoreDisplay = document.querySelector("#score");
const StartBtn = document.querySelector("#start-button");
const width = 10;


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
        random = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
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
}






})
