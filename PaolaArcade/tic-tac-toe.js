/* draw the board */
const boxes = Array.from(document.getElementsByClassName('box'));

const playText = document.getElementById('playText');

const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = O_TEXT;


const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = '';
    /* Board:
    0, 1, 2
    3, 4, 5 
    6, 7, 8 */

    /* if it is on top*/
    if (index < 3){
      styleString += `border-bottom: 3px solid var(--purple);`;
    }
    /* if it is on the left side*/
    if(index % 3 === 0){
      styleString += `border-right: 3px solid var(--purple);`;
    }
    /* if it is on the right side*/
    if(index % 3 === 2){
      styleString += `border-left: 3px solid var(--purple);`;
    }
    /* if it is on bottom*/
    if (index > 5){
      styleString += `border-top: 3px solid var(--purple);`;
    }
    box.style = styleString;
    box.addEventListener('click', boxClicked)
  });
};

const boxClicked = (e) => {
  const id = e.target.id; /* get index*/
   /*if nothing in the space */
  if(!spaces[id]) {
     spaces[id] = currentPlayer;
     e.target.innerText = currentPlayer;

     if(playerHasWon(currentPlayer)){
       playText.innerText = `${currentPlayer} has won!`;
       return;
     }
     currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;

  }
};


const playerHasWon = (currentPlayer) => {
  if(spaces[0] === currentPlayer){
    if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
      return true; /* wins up top*/
    }
    if(spaces[3] == currentPlayer && spaces[6] === currentPlayer){
      return true; /*wins on the left */
    }
    if(spaces[4] == currentPlayer && spaces[8] === currentPlayer){
      return true; /*wins diagonally */
    }

  } 
  if (spaces[8] === currentPlayer){
    if(spaces[2] === currentPlayer && spaces[5] === currentPlayer){
      return true; /* wins on the right */
    }
    if(spaces[6] === currentPlayer && spaces[7] === currentPlayer){
      return true; /*wins on the bottom */
    }

  } 
  if (spaces[4] === currentPlayer){
    if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
      return true; /* wins  vertically in the middle */
    }
    if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
      return true; /*wins horizontally in the middle */
    }
    
}
};


document.getElementById("restartBtn").addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playText.innerHTML = `Let's Play!!`;

  currentPlayer = O_TEXT;
});

drawBoard();