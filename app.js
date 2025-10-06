let boxes=document.querySelectorAll(".btn");
let reset=document.querySelector("#resetgame");
let newgame=document.querySelector("#newgame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true;
let count=0;

const wingame=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [2,4,6]
];

const resetgame=()=>{
    turn0=true;
    count=0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="O";
            box.style.color="black";
            turn0=false;
        }else{
            box.innerText="X";
            box.style.color="red";
            turn0=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();

        if(count===9 && !isWinner){
            gamedraw();
        }

        checkWinner();
    });
});

const gamedraw=()=>{
    msg.innerText="Game was a draw";
    msgcontainer.classList.remove("hide");
    disableboxes();

}

const disableboxes=()=>{
    for(box of boxes){
        box.disabled=true;
    }
}

const enableboxes=()=>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();

}
const checkWinner =()=>{
    for(pattern of wingame){
        let posval1=boxes[pattern[0]].innerText;
        let posval2=boxes[pattern[1]].innerText;
        let posval3=boxes[pattern[2]].innerText;

        if(posval1!="" && posval2!="" && posval3!=""){
            if(posval1===posval2 && posval2===posval3){
                showWinner(posval1);
            }
        }
    }

}

newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);