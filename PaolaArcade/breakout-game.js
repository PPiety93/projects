const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
let xDirection = 2;
let yDirection = 2;
let score = 0;

const playerStart = [230,10];
let currentPosition = playerStart;

const ballStart = [270,30];
let ballCurrentPosition = ballStart;

//create each block

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  };
};

//array of blocks
const blocks = [
  new Block(10,270), /* xAxis, y Axis*/
  new Block(120,270), /* add 110 px */
  new Block(230,270),
  new Block(340,270),
  new Block(450,270),

  new Block(10,240), 
  new Block(120,240), 
  new Block(230,240),
  new Block(340,240),
  new Block(450,240),

  new Block(10,210), 
  new Block(120,210), 
  new Block(230,210),
  new Block(340,210),
  new Block(450,210),

];


//draw all my blocks
function addBlocks() {

  for (let i = 0; i< blocks.length; i++){
  const block = document.createElement('div')
  block.classList.add('block')
  block.style.left = blocks[i].bottomLeft[0] + 'px'
  block.style.bottom = blocks[i].bottomLeft[1] + 'px'
  grid.appendChild(block)
  };
};

addBlocks()

//add player

const player = document.createElement('div');
player.classList.add('player');
drawPlayer()
grid.appendChild(player);

//draw the user 
function drawPlayer(){
  player.style.left = currentPosition[0] + 'px'
  player.style.bottom = currentPosition[1] + 'px'
};

//draw the ball

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px' 
}

//move user
function movePlayer(e) {
  switch(e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] >0) { /*establish limit for left*/ 
      currentPosition[0] -= 10
      drawPlayer()
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) { /*establish limit for right*/ 
      currentPosition[0] += 10
      drawPlayer()
      }
      break;
  }
};

document.addEventListener('keydown',movePlayer)

//add ball

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//move the ball

function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall();
  checkForCollisions();
};

timerId = setInterval(moveBall, 25)



//check for collisions
function checkForCollisions() {
  //check if hits a block
  for(let i=0; i<blocks.length; i++){
    if (
      (ballCurrentPosition[0] > blocks[i]. bottomLeft[0] && ballCurrentPosition[0] <blocks[i].bottomRight[0]) && 
      ((ballCurrentPosition[1] + ballDiameter) >blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
     ) {
       const allBlocks = Array.from(document.querySelectorAll('.block'))
       allBlocks[i].classList.remove('block')
       blocks.splice(i, 1) /*delete it from the orginal array*/ 
       changeDirection()
       score ++
       scoreDisplay.innerHTML = score

      //check for win
      if(blocks.length ===0) {
        scoreDisplay.innerHTML = "You Win!"
        clearInterval(timerId)
        document.removeEventListener('keydown', movePlayer)
      };

     };
    
  };



  //check if hits the wall
  if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
  ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
  ballCurrentPosition[0] <= 0) { /* if it is off the grid*/
    changeDirection();
  };

  //check for user collisions

  if (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1]< currentPosition[1] + blockHeight)
    ) {
      changeDirection()
    };


  //check for game over
  if (ballCurrentPosition[1] <=0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = "You lose!";
    document.removeEventListener('keydown', movePlayer)
  };
};

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  };
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  };
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  };
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  };
};


//restart game
document.getElementById("restartBtn").addEventListener("click", () => {
  document.location.reload();
});