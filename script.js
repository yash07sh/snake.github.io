// game const and variables
let inputdir = {x:0,y:0};


const foodsound = new Audio("../assests/food.mp3")
const gameendsound = new Audio("../assests/end.mp3")
const move = new Audio("../assests/move.mp3")
const bgsound = new Audio("../assests/bg.mp3")
let score = 0;
let speed = 5;
let hiscoreval = 0;
let hiscore= localStorage.getItem("hiscore");
if(hiscore === null){
    localStorage.setItem("hiscore","0")
}






let snakearr = [
    {x:13,y:13}
];

let food ={x:5,y:6};

let LastPaintTime =0;

// game function 
function main (ctime){
    window.requestAnimationFrame(main)
    //console.log(ctime)

    if((ctime - LastPaintTime)/1000 < 1/speed){
        return;
    }

    LastPaintTime = ctime;
    gameengine();
}


function gameengine(){

    function iscollide(snake) {
        //if you bump into you self
      for (let i = 1; i < snake.length; i++) {
       if (snake[i].x === snake [0].x && snake[i].y === snake[0].y) {
        return true;
       }
        
      }
        if (snake[0].x >=18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0){
            return true;
        }
    }
//part 1 : updating the snake and food 

if(iscollide(snakearr)){
    gameendsound.play();

    score = 0;
    inputdir = {x:0,y:0};
    alert("Game is over. Press any key to continue");
    snakearr = [ {x:13,y:13} ]
}

// if you have eaten the food so will update the food and the score
if(snakearr[0].y === food.y && snakearr[0].x === food.x){
    foodsound.play();
    score += 1;

   
    snakearr.unshift({x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y})
    food = { x: Math.floor(Math.random()*16) +2, y: Math.floor(Math.random()*16) +2 }
} 
if(score>parseInt(hiscore)){
    hiscoreval = score;
    localStorage.setItem("hiscore",String(hiscoreval))
    hiscore = localStorage.getItem("hiscore")
}
    

scorebox.innerHTML= "Score: " + score;
hiscorebox.innerHTML= "High Score: " + hiscore;
// Moving the snake 
for (let i = snakearr.length-2; i>=0; i--) {
    snakearr[i+1] = {...snakearr[i]}
}

snakearr[0].x += inputdir.x
snakearr[0].y += inputdir.y


// part 2 displaying the head

board.innerHTML = "";
snakearr.forEach((element,index)=>{
    let  snakeelement = document.createElement("div")
    snakeelement.style.gridRowStart = element.y;
    snakeelement.style.gridColumnStart = element.x;
    index===0 ? snakeelement.classList.add("head"):  snakeelement.classList.add("snake");
    board.appendChild(snakeelement)
    
});

// part 3 displaying the food
    let  foodelement = document.createElement("div")
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add("food");
    board.appendChild(foodelement)


}



//game main code 
window.requestAnimationFrame(main)

window.addEventListener("keydown",(e)=>{
    inputdir = {x:0,y:1};
    move.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup")
            inputdir.x= 0;
            inputdir.y= -1;
            break;
        case "ArrowDown":
            console.log("arrowDown")
            inputdir.x= 0;
            inputdir.y= 1;
            break;
        case "ArrowLeft":
            inputdir.x= -1;
            inputdir.y= 0;
            console.log("arrowleft")
            break;
        case "ArrowRight":
            inputdir.x= 1;
            inputdir.y= 0;
            console.log("arrowRight")
            break;     
        default:
            break;
    }


})