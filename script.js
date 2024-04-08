document.addEventListener('DOMContentLoaded', () => {
    // Code inside this block will run after the HTML content has been fully loaded into the browser

    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector(".reset-btn");
    let winnerScreen = document.querySelector('.winnerScreen');
    let screenContainer = document.querySelector('.screenContainer');
    let winnerDisplay = document.querySelector('.winnerDisplay');
    let newGame = document.querySelector('.newGame');

    let newGameBtn = document.querySelector('.newGame');
    let turnO = true;

    let count = 0;

    const winsPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const WinnerScreen = () => {
        screenContainer.classList.remove("hide");
        winnerScreen.classList.remove("hide");
        winnerDisplay.classList.remove("hide");
        newGame.classList.remove("hide");
    };

    const hideWinnerScreen = () => {
        screenContainer.classList.add("hide");
        winnerScreen.classList.add("hide");
        winnerDisplay.classList.add("hide");
        newGame.classList.add("hide");
    };

    const gameDraw = () => {
        winnerDisplay.innerHTML = "It's a Tie !!!<br>Try again!";
        console.log(`its a tie`);
        turnO=true;
      };

    newGameBtn.addEventListener('click', () => {
        console.log("new game btn was clicked !");
        boxes.forEach((box) => {
            hideWinnerScreen();
            box.innerHTML = '';
            boxEnable();
            count=0;
            turnO=true;
        });
    });

    const checkWinner = () => {
        for (let pattern of winsPattern) {
            let pos1 = boxes[pattern[0]].innerHTML;
            let pos2 = boxes[pattern[1]].innerHTML;
            let pos3 = boxes[pattern[2]].innerHTML;

            if (pos1 != '' && pos2 != '' && pos3 != '') {
                if (pos1 === pos2 && pos2 === pos3) {
                    console.log("winner is found");
                    boxDisable();
                    let winner = pos1;
                    displayWinner(winner);
                    
                    WinnerScreen();
                    return true;
                } 
            }
        }
    };

    const displayWinner = (winner) => {
        if (winner) {
            console.log(`winner : ${winner}`);
            winnerDisplay.innerHTML = `Yay!!!<br>Congratulations !<br>Winner is ${winner}`;
        } else {
            gameDraw();
        }
    };

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("box was clicked");

            if (turnO === true) {
                box.innerText = 'O';
                turnO = false;
            } else {
                box.innerText = 'X';
                turnO = true;
            }

            box.disabled = true;
            count++;

               let isWinner = checkWinner();

               if (count === 9 && !isWinner) {
                gameDraw();
              }

        });
    });

    const boxEnable = () => {
        for (let box of boxes) {
            box.disabled = false;
        }
    };

    const boxDisable = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    };

    resetBtn.addEventListener("click", () => {
        console.log("reset button was clicked !");
        boxes.forEach((box) => {
            box.innerHTML = '';
            boxEnable();
            count = 0;
        });
    });
});
