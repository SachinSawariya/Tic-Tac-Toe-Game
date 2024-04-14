let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgCcontainer = document.querySelector(".msg-container");

let winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
 [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let turnX = true; //true is X, false is O
let count = 0;

const reset = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgCcontainer.classList.add("hide");
}

newBtn.addEventListener('click', reset);
resetBtn.addEventListener('click', reset);

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const gameDraw = () =>{
    msg.innerText = `The Game is Draw ! Start the New Game`;
    msgCcontainer.classList.remove("hide");
    disableBoxes();
} 

const showWinner = (Winner) => {
    msg.innerText = `Congratulations Winner is ${Winner}`;
    msgCcontainer.classList.remove("hide");
    disableBoxes();
    

};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;


        if(pos1val !== "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};


boxes.forEach( (box) =>{
    box.addEventListener('click', ()=>{
        if(turnX){
            box.innerText = 'X';
            turnX = false;
        }else{
            box.innerHTML = 'O';
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })

});
