let ball   = document.querySelector('.ball');
let playground = document.querySelector('.playground');
let hole = document.querySelector('.hole');
let fences = document.querySelectorAll('.fence');

let beta = 0;
let gamma = 0;
let stop = false;
let start = true;
let ballYPosition = 600;
let ballXPosition = 165;

function handleOrientation(event) {
    beta = event.beta;
    gamma = event.gamma;

    if(beta>90){
        beta = 90;
    }
    if(gamma < -90){
        gamma = -90;
    }
    if(start){
        start=false;
    moveBall();
  }
}

function moveBall(){
    setTimeout(function(){
        if(beta<-0.16){
            ballYPosition-=(0.5*(beta*(-1)));
            if(ballYPosition<0)ballYPosition=0;
        }

        if(beta>0.16){
            ballYPosition+=(0.5*beta);
            if(ballYPosition>600)ballYPosition=600;
        }

        if(gamma<-0.16){
            ballXPosition-=(0.5*(gamma*(-1)));
            if(ballXPosition<0)ballXPosition=0;
        }

        if(gamma>0.16){
            ballXPosition+=(0.5*gamma);
            if(ballXPosition>320)ballXPosition=320;
        }
        ball.style.top  = ballYPosition + "px";
        ball.style.left  = ballXPosition + "px";
        checkCollisions();

        if(stop == true)
            return;
        moveBall();
    },10)  
}

function isCollision(a, b){
    let obj_a = a.getBoundingClientRect();
    let obj_b = b.getBoundingClientRect();
    if (obj_a.left < obj_b.left + obj_b.width  && obj_a.left + obj_a.width  > obj_b.left &&
        obj_a.top < obj_b.top + obj_b.height && obj_a.top + obj_a.height > obj_b.top)
        return true;
        else return false;
}



function checkCollisions(){
    for(i=0;i<fences.length;i++){
        if(isCollision(ball, fences[i])) stop=true;
    }
    if(isCollision(ball, hole)){
        stop=true;
    }
}

function newGame(){
    ballXPosition=165;
    ballYPosition=570;
    moveBall();
    start=true;
    stop=false;
}


window.addEventListener('deviceorientation', handleOrientation); 