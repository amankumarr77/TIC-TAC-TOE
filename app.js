let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn = document.querySelector("#newbtn");
let msgcon = document.querySelector(".msgcon");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0; 

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableboxes();
  msgcon.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let iswinner = checkwinner();

    if (count === 9 && !iswinner) {
      gamedraw();
    }
  });
});

const gamedraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcon.classList.remove("hide");
  disableboxes();
};

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showwinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgcon.classList.remove("hide");
  disableboxes();
};

const checkwinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showwinner(pos1Val);
        return true;
      }
    }
  }
};

newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);