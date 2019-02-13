var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');
var point = document.querySelector('.point');

let x = 0;
let y = 0;

function handleOrientation(event)
{
  x = event.beta; 
  y = event.gamma; 

  output.innerHTML  = "Beta : " + x + "\n";
  output.innerHTML += "Gamma: " + y + "\n";
  output.innerHTML += "Points: " + points + "\n";


  //Wymuszamy wartość [-90,90] po to, aby urządzenie nie było
  //do góry nogami
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

}
// Wszystkie zmienne które są nam potrzebne, definiujemy je tutaj bo używane są w wielu funkcjach
let i = 1;
let xx = 0;
let yy = 0;
let xp = 0;
let yp = 0;
let points = 0;
let timer = 10000;
let mnoznik = setInterval(mnoznikv, 10);
let pointmnoznik = setInterval(pointPos, timer);
let penalty = setInterval(removePoint, timer);

// Funkcja mnoznikv definiuje prędkość przesuwu kulki w zależności od nachylenia telefonu
function mnoznikv()
{
  i = 0.04;
    
  xx += x*i;
  yy += y*i;
  ball.style.top  = (400 + xx) + "px";
  ball.style.left = (400 + yy) + "px";
// Game Over jeżeli punkty spadną nam poniżej 0 lub jeżeli przekroczymy granice planszy    
  if (xx > 370 || xx < -390 || yy > 370 || yy < -390 || points < 0)
  {
    gameOver();
  }
  
  if ((400 + xx) - xp < 25 && (400 + yy) - yp < 25 && (400 + xx) - xp > -25 && (400 + yy) - yp > -25)
  {
    addPoint();
    pointPos();
  }
  
}
// Randomowe ustawienie zielonej kulki na planszy
function pointPos()
{
  point.style.display = "block";
  xp = ((Math.random() * 790) + 1);
  yp = ((Math.random() * 790) + 1);
  point.style.top = (20 + xp) + "px";
  point.style.left = (20 + yp) + "px";
  clearInterval(pointmnoznik);
  pointmnoznik = setInterval(pointPos, timer);
}
// Funkcja dodawania punktu, skraca timer dzięki czemu następna zielona kulka pojawia się szybciej
// Dodatkowo resetuje nam Interval od kary dzięki czemu nie tracimy punktu jeśli na czas zbierzemy zieloną kulke
function addPoint()
{
  points += 1;
  timer -= 400;
  clearInterval(penalty);
  penalty = setInterval(removePoint, timer);
  if (timer <= 1000)
  {
    timer = 1000;
  }
}
// Kara -1 punkt jeśli nie zbierzemy zielonej kulki na czas
function removePoint()
{
  points -= 1;
  clearInterval(penalty);
  penalty = setInterval(removePoint, timer);
}
// Reset wszystkiego, timera, pozycji, oraz punktów. Dodatkowo wyzerowanie obu timerów
function gameOver()
{
  timer = 10000;
  xx = 0;
  yy = 0;
  points = 0;
  clearInterval(pointmnoznik);
  pointmnoznik = setInterval(pointPos, timer);
  clearInterval(penalty);
  penalty = setInterval(removePoint, timer);
}

window.addEventListener('deviceorientation', handleOrientation);

