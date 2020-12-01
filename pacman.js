var world = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 1, 2, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 2, 1, 1, 2, 2, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 3, 2],
  [2, 1, 1, 2, 2, 2, 1, 2, 1, 2],
  [2, 1, 1, 3, 1, 1, 1, 2, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 2, 3, 2],
  [2, 1, 2, 1, 2, 2, 2, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [2, 1, 2, 2, 2, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

var score = 0;

var pacman = {
  x: 1,
  y: 1
};

function displayWorld() {
  var output = "";
  for (var i = 0; i < world.length; i++) {
    output += "\n<div class='row'>\n";
    for (var j = 0; j < world[i].length; j++) {
      if (world[i][j] === 2) {
        output += "<div class='brick'></div>";
      } else if (world[i][j] === 1) {
        output += "<div class='coin'></div>";
      } else if (world[i][j] === 0) {
        output += "<div class='empty'></div>";
      } if (world[i][j] === 3) {
        output += "<div class='cherry'></div>";
      }
    }
    output += "\n</div>";
  }
  // console.log(output);
  document.getElementById('world').innerHTML = output;
};

function displayPacman() {
  document.getElementById('pacman').style.top = pacman.y * 20 + "px";
  document.getElementById('pacman').style.left = pacman.x * 20 + "px";
};

function displayScore() {
  document.getElementById('score').innerHTML = score;
};

function rotatePacman(direction) {
  // if keycode == 37 left
  // rotate 180deg?
  // if keyCode == 38 up
  // rotate -90deg
  //if keyCode == 39 right
  // no need to rotate since pacman is usually facing right
  // if keyCode == 40 down
  // rotate 90deg
  if (direction === 'left') {
    document.getElementById('pacman').style.transform = 'rotate(180deg)';
  } else if (direction === 'up') {
    document.getElementById('pacman').style.transform = 'rotate(-90deg)';
  } else if (direction === 'down') {
    document.getElementById('pacman').style.transform = 'rotate(90deg)';
  } else if (direction === 'right') {
    document.getElementById('pacman').style.transform = 'rotate(360deg)';
  }

};

displayWorld();
displayPacman();
displayScore();

// x = left and right
// y = top and down

document.onkeydown = function(e) {
if(e.keyCode === 37 && world[pacman.y][pacman.x - 1] != 2) { // left
    rotatePacman('left');
    pacman.x --;
  } else if (e.keyCode === 39 && world[pacman.y][pacman.x + 1] != 2) { // right
    rotatePacman('right');
    pacman.x ++;
  } else if (e.keyCode === 38 && world[pacman.y - 1][pacman.x] != 2) { // up
    rotatePacman('up');
    pacman.y --;
  } else if (e.keyCode === 40 && world[pacman.y + 1][pacman.x] != 2) { // down
    rotatePacman('down');
    pacman.y ++;
  }

  // if pacman is currently in  square where there's a coin
  if (world[pacman.y][pacman.x] === 1) {
    // change the square to a empty
    world[pacman.y][pacman.x] = 0;
    // increase the score
    score += 10;
    // display the world again
    displayWorld();
    //display the score
    displayScore();
  }

  // get rid of cherry and increase score by 50
  if (world[pacman.y][pacman.x] === 3) {
    world[pacman.y][pacman.x] = 0;
    score += 50;
    displayWorld();
    displayScore();
  }
  // console.log(e.keyCode);
  displayPacman();
};
