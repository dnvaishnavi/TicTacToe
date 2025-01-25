import canvasConfetti from 'https://cdn.skypack.dev/canvas-confetti';

let tiles=document.querySelectorAll(".tile");
let resetbtn=document.querySelector("#reset-btn");
let newbtn=document.querySelector("#new-btn");
let msg_container=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");

let turn_0=true;
const pattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

tiles.forEach((tile) => {
    tile.addEventListener("click",()=>{
        if(turn_0){
            tile.innerHTML="O";
            turn_0=false;
        }
        else{
            tile.innerHTML="X";
            turn_0=true;
        }
        tile.disabled=true;
        checkWinner();
        let isDraw = true;
        for (let tile of tiles) {
            if (tile.innerText === "") {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
       msg.innerText = "It's a Draw!";
       msg_container.classList.remove("hide");
       disablebtns();
}

    });
});

const disablebtns=()=>{
    for(let tile of tiles){
        tile.disabled=true;
    }
}
const enablebtns=()=>{
    for(let tile of tiles){
        tile.disabled=false;
        tile.innerText="";
    }
}

const reset=()=>{
    turn_0=true;
    enablebtns();
    msg_container.classList.add("hide");
}

const showWinner=(winner)=>{
    canvasConfetti({
        particleCount: 200,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }, // Center of the screen
        
    });
    msg.innerText=`Congratulations!!! \n Winner is player ${winner} `;
    msg_container.classList.remove("hide");
    disablebtns();
}

const checkWinner=()=>{
    for(let pat of pattern){
        let p1=tiles[pat[0]].innerText;
        let p2=tiles[pat[1]].innerText;
        let p3=tiles[pat[2]].innerText;
        if(p1!="" && p2!="" && p3!=""){
            if(p1===p2 && p2===p3){
                console.log("Winner",p1);
                showWinner(p1);
                return;
            }
        }
    }
}

newbtn.addEventListener("click",reset);
resetbtn.addEventListener("click",reset);