window.addEventListener("load",initGame)


function initGame (){

  document.getElementById("buttons").addEventListener("click", function getChoices(e) {
    let userchoice = getUserChoices(e)
    let compchoice = computer_choice() /* call the computer_choice function*/
    results(userchoice, compchoice) /* call the results function with the parameters*/})
}


function getUserChoices(e){

 
     // e.target is the clicked element
    //check if each button has been clicked

    let userchoice = ``;  
    let img = ``;

    //check if button Rock has been clicked
    if(e.target && e.target.id == "R") {
      userchoice = document.getElementById("R").value;
      img = document.getElementById("rock_img");
      hide_image("paper_img")
      hide_image("scissors_img")
    }

    //check if button Paper has been clicked
    else if(e.target && e.target.id == "P") {
      userchoice = document.getElementById("P").value;
      img = document.getElementById("paper_img");
      hide_image("rock_img")
      hide_image("scissors_img")
    }

    //check if button Scissors has been clicked
    else if(e.target && e.target.id == "S") {
      userchoice = document.getElementById("S").value;
      img = document.getElementById("scissors_img");
      hide_image("paper_img")
      hide_image("rock_img")
    }

    img.style.display = "block";

    

  return userchoice;
 
 
}

function hide_image(id){
      document.getElementById(id).style.display = 'none';
}

/*computer choice function*/ 

 function computer_choice()
      {
          /* random computer choice */ 
        let computerChoiceArray = ['rock', 'paper', 'scissors'];  

        let computerchoice = computerChoiceArray[Math.floor(Math.random() * computerChoiceArray.length)];

        let img2 = ``;

        if(computerchoice == 'rock') {
          img2 = document.getElementById("comp_rock_img");
          hide_image("comp_paper_img")
          hide_image("comp_scissors_img")
        }

        else if(computerchoice == 'paper') {
          img2 = document.getElementById("comp_paper_img");
          hide_image("comp_rock_img")
          hide_image("comp_scissors_img")
        }

        else if(computerchoice == 'scissors') {
          img2 = document.getElementById("comp_scissors_img");
          hide_image("comp_rock_img")
          hide_image("comp_paper_img")
        }
    
        img2.style.display = "block";

        //document.getElementById('computerchoice').innerHTML = `${computerchoice}`;

        return computerchoice
      }

/*results function*/ 

function results(choice, computerchoice)
      {

        let message2 = ``;

        if (choice == "rock" && computerchoice =="rock")
        {
          message2 = "It's a tie!";
        }
        else if (choice == "paper" && computerchoice =="rock")
        {
          message2 = "User wins!";
        }
        else if (choice == "scissors" && computerchoice =="rock")
        {
          message2 = "Computer wins!";
        }
        else if (choice == "rock" && computerchoice =="paper")
        {
          message2 = "Computer wins!";
        }
        else if (choice == "paper" && computerchoice =="paper")
        {
          message2 = "It's a tie!";
        }
        else if (choice == "scissors" && computerchoice =="paper")
        {
          message2 = "User wins!";
        }
        else if (choice == "rock" && computerchoice =="scissors")
        {
          message2 = "User wins!";
        }
        else if (choice == "paper" && computerchoice =="scissors")
        {
          message2 = "Computer wins!";
        }
        else if (choice == "scissors" && computerchoice =="scissors")
        {
          message2 = "It's a tie!";
        }

        document.getElementById('result').innerHTML = `${message2}`;
      }
        
        
//restart game
document.getElementById("restartBtn").addEventListener("click", () => {
  document.location.reload();
});       
     

      
      