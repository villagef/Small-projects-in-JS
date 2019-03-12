window.addEventListener('deviceorientation', handleOrientation, true);

//getting elements
let ball = document.querySelector('.ball');
let area = document.querySelector('.play-area');
let output = document.querySelector('.output');

//getting widht and height of the field
let xMax = area.clientWidth - ball.clientWidth;
let yMax = area.clientHeight - ball.clientHeight;

function handleOrientation() {
    
    let beta = event.beta; //turning up/down
    let gamma = event.gamma; //turning left/right

    output.innerHTML = "beta :" + beta + "\n";
    output.innerHTML = "gamma :" + gamma + "\n";

    if(beta > 90) {
        beta = 90;
    }
    if(beta < -90) {
        beta = -90;
    }

    beta += 90;
    gamma += 90;

    //where ball can move
    ball.style.top  = (xMax*beta/90 - 15) + "px";
    ball.style.left = (yMax*gamma/90 - 15) + "px";

    //barrier on the field ball can't cross
    if(ball.style.top < 15) {
        ball.style.top = 15;
    }
    if(ball.style.bottom < 15) {
        ball.style.bottom = 15;
    }
    if(ball.style.right < 15) {
        ball.style.right = 15;
    }
    if(ball.style.left < 15) {
        ball.style.left = 15;
    }
}
//phone motion
window.addEventListener('devicemotion', handleMotion, true);

function handleMotion() {

}

//over when ball touch hole
function gameOver() {
    //elements from html
    let hole = document.querySelector('.hole');

    let ball = document.querySelector('.ball');

    //getting position of elements
    let holePosition = hole1.getBoundingClientRect();

//test
    console.log(holePosition.top, holePosition.right, holePosition.bottom, holePosition.left);


    let ballPosition = ball.getBoundingClientRect();
    console.log(ballPosition.top, ballPosition.right, ballPosition.bottom, ballPosition.left);

}



