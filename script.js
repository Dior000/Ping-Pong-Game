const gameboard = document.getElementById("gameboard");
const paddle1 = document.getElementById("paddle_1");
const paddle2 = document.getElementById("paddle_2");
const ball = document.getElementById("ball");
// const paddle = document.querySelector(".paddle");
const score1=document.getElementById('player1Score')
const score2=document.getElementById('player2Score')

wpress = false;
dpress = false;
uppress = false;
downpress = false;

let Vx = 3;
let Vy = 2;
let V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
console.log(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)))
//////// Collision /////////////////////
function collision(paddle) {
  let balltop = ball.offsetTop;
  let ballbottom = ball.offsetTop + ball.offsetHeight;
  let ballleft = ball.offsetLeft;
  let ballright = ball.offsetLeft + ball.offsetWidth;
// console.log(balltop)
  let paddletop = paddle.offsetTop;
  let paddlebottom = paddle.offsetTop + paddle.offsetHeight;
  let paddleleft = paddle.offsetLeft;
  let paddleright = paddle.offsetWidth + paddle.offsetLeft;
// console.log(paddletop)
  if (
    ballbottom > paddletop &&
    balltop < paddlebottom &&
    paddleleft < ballright &&
    paddleright > ballleft
  ) {
    console.log("detected");
    return true;
  } else {
    return false;
  }
}
//////////Collision ////////////////////

//  /////////////////////paddle 1/////////////////////////////////////
document.addEventListener("keydown", (e) => {
  if (e.key == "w") {
    wpress = true;
  } else if (e.key == "d") {
    dpress = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "w") {
    wpress = false;
  } else if (e.key == "d") {
    dpress = false;
  }
});
////////////////////////////////////////////////////

////////////Paddle 2/////////////////////////
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 38) {
    uppress = true;
  } else if (e.keyCode == 40) {
    downpress = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 38) {
    uppress = false;
  } else if (e.keyCode == 40) {
    downpress = false;
  }
});
function reset() {
  ball.style.left = "50%";
  ball.style.top = "50%";
  Vx = -3;
  Vy = -2;
  V = Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2));
}
move = 3;

function gameloop() {
  ////////////////   Paddle Movement//////////////////////
  if (wpress && paddle1.offsetTop > 55) {
    paddle1.style.top = paddle1.offsetTop - move + "px";
  } else if (
    dpress &&
    paddle1.offsetTop < gameboard.offsetHeight - paddle1.offsetHeight + 50
  ) {
    paddle1.style.top = paddle1.offsetTop + move + "px";
  } else if (uppress && paddle2.offsetTop > 55) {
    paddle2.style.top = paddle2.offsetTop - move + "px";
  } else if (
    downpress &&
    paddle2.offsetTop < gameboard.offsetHeight - paddle2.offsetHeight + 50
  ) {
    paddle2.style.top = paddle2.offsetTop + move + "px";
  }
  ////////////////   Paddle Movement//////////////////////

 
  //////////////////// Ball Movement /////////////////////////////

  ///////// Active Paddle //////////
  let paddle =ball.offsetLeft < gameboard.offsetWidth/2 ? paddle1 : paddle2;
    // console.log(paddle)
  ///////// Active Paddle //////////

  ////////////////// Collision angle ////////////////////////
  let angle = 0;

  let ballcenterY = ball.offsetTop + ball.offsetHeight / 2;
  let paddlcenterY = paddle.offsetTop + paddle.offsetHeight / 2;


  if (collision(paddle)) {
    if (paddle == paddle1) {
      // debugger;
      if (ballcenterY < paddlcenterY) {
        // debugger;
        angle = 3*Math.PI / 4;
      } else if (ballcenterY > paddlcenterY) {
        // debugger;
        angle = Math.PI / 4;
      } else {
        angle = 0;
      }
    } else if (paddle == paddle2) {
      if (ballcenterY < paddlcenterY) {
        angle = -3*Math.PI / 4;
      } else if (ballcenterY > paddlcenterY) {
        angle =  3*Math.PI / 4;
        debugger;
      } else {
        angle =0;
      }
    }

    Vx = V * Math.sin(angle);
    Vy = V * Math.cos(angle);

  }

  ////////////////// Collision angle ////////////////////////
   //////////////////// Ball Movement /////////////////////////////
   ball.style.top=ball.offsetTop+Vy+'px'
   ball.style.left=ball.offsetLeft+Vx+'px'
   if (ball.offsetTop < 0) {
     Vy = -Vy;
   
   }
   if (ball.offsetTop > gameboard.offsetHeight - ball.offsetHeight) {
     Vy = -Vy;
     
   } else if (ball.offsetLeft < 0) {
     score2.innerHTML++
     reset();
     // Vx=-Vx
    
   } else if (ball.offsetLeft > gameboard.offsetWidth - ball.offsetWidth) {
     score1.innerHTML++
     reset();
     // Vx=-Vx
     
   }

  requestAnimationFrame(gameloop);
}
gameloop();
