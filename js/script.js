let order = [];
let clickedOrder = []; 
let flash
let turn;
let playerTurn;
let on = false;
let off = true;
let sound = true;
let intervalId;
let hits;
let win;


const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const onButton = document.querySelector('#on');
const offButton = document.querySelector('#off');
const startButton = document.querySelector('#start');
const scoreData = document.querySelector('#score');
const turnCounter = document.querySelector('#turn');

scoreData.innerHTML = "--";

offButton.addEventListener('click', (event) => {
  if (offButton.checked == true) {
    off = true;
    turnCounter.innerHTML = "";
    scoreData.innerHTML = "--";
    startButton.disabled = true;
    clearColor();
    flash = 0;
    playerOrder = [];
    console.log("off");
  } else {
    off = false;
  }
});

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true ) {
    on = true;
    turnCounter.innerHTML = "--";
    scoreData.innerHTML = "0";
    startButton.disabled = false;
    sound = false;
    hits = false;
    order = [];
    clickedOrder = [];
    playerOrder = [];
    clearColor();
    console.log("on");
  } else {
    on = false;
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
    if ( on || win) {
      console.log("started!");
      play();
    }
  });

function play() {
  win = false;
  order = [];
  clickedOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = "1";
  scoreData.innerHTML = "0";
  hits = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  playerTurn = true;
  
  intervalId = setInterval(gameTurn, 800);
};

  function gameTurn() {
    on = false;
  
    if (flash == turn) {
      clearInterval(intervalId);
      playerTurn = false;
      clearColor();
      on = true;
    }
  
    if (playerTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] == 1) soundOne();
        if (order[flash] == 2) soundTwo();
        if (order[flash] == 3) soundThree();
        if (order[flash] == 4) soundFour();
        flash++;
      }, 200);
    }
  };

  function soundOne() {
    if (sound) {
      let audio = document.getElementById("sound1");
      audio.play();
    }
    sound = true;
    green.style.backgroundColor = "green";
  };
  
  function soundTwo() {
    if (sound) {
      let audio = document.getElementById("sound2");
      audio.play();
    }
    sound = true;
    red.style.backgroundColor = "red";
  };
  
  function soundThree() {
    if (sound) {
      let audio = document.getElementById("sound3");
      audio.play();
    }
    sound = true;
    yellow.style.backgroundColor = "yellow";
  };
  
  function soundFour() {
    if (sound) {
      let audio = document.getElementById("sound4");
      audio.play();
    }
    sound = true;
    blue.style.backgroundColor = "blue";
  };
  
  function clearColor() {
    green.style.backgroundColor = "darkgreen";
    red.style.backgroundColor = "darkred";
    yellow.style.backgroundColor = "goldenrod";
    blue.style.backgroundColor = "darkblue";
  };
  
  function flashColor() {
    green.style.backgroundColor = "lime";
    red.style.backgroundColor = "red";
    yellow.style.backgroundColor = "yellow";
    blue.style.backgroundColor = "blue";
  };

  green.addEventListener('click', (event) => {
    if (on) {
      clickedOrder.push(1);
      check();
      soundOne();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
        
      }
    }
  });
  
  red.addEventListener('click', (event) => {
    if (on) {
      clickedOrder.push(2);
      check();
      soundTwo();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  });
  
  yellow.addEventListener('click', (event) => {
    if (on) {
      clickedOrder.push(3);
      check();
      soundThree();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  });
  
  blue.addEventListener('click', (event) => {
    if (on) {
      clickedOrder.push(4);
      check();
      soundFour();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  });

  function check() {
    if (clickedOrder[clickedOrder.length - 1] !== order[clickedOrder.length - 1])
      hits = false; 
  
    if (clickedOrder.length == 9 && hits) {
      flashColor();
      winGame();
    }
  
    if (hits == false) {
      flashColor();
      loseGame();       
    }
  
    if (turn == clickedOrder.length && hits && !win) {
      turn++;
      clickedOrder = [];
      playerTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      scoreData.innerHTML = turn - 1 ;
      intervalId = setInterval(gameTurn, 800);
    }
  
  };
  
  function winGame() {
    turnCounter.innerHTML = "Win";
    scoreData.innerHTML = turn - 1; 
    on = false;
    win = true;
    startButton.disabled = true;
    offButton.checked = true;
  };

  function loseGame(){
    turnCounter.innerHTML = "Lose!";

    setTimeout(() => {
      clearColor();
      play();
         
    }, 800);

    sound = false;
  }
  
  
  