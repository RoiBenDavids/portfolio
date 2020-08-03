const PACMAN = '&#9786;';

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 5,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      eatGhost(nextLocation,true);
      setTimeout(returnGhosts, 5000,);
    }
    else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  } else if (nextCell === SUPERFOOD) {
    if (gPacman.isSuper) return
    gPacman.isSuper = true;
    renderGhosts();
    setTimeout(function () {
      gPacman.isSuper = false;
      renderGhosts();
    }, 5000)
  } else if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Render updated model to the DOM
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // Update the pacman MODEL to new location
  var rotate = nextLocation.direction;
  rotate = getAngleOfRotation(rotate)
  renderCell(gPacman.location, `<div  style="transform: rotate(${rotate}deg)">${PACMAN}</div>`);

  // Hitting FOOD? update score, if last food ends game (after moving to the final location)
  if (nextCell === FOOD) {
    updateScore(1);
    gGame.eatenFoodNum++;
    if (gGame.eatenFoodNum === gGame.foodNum) gameOver(true);

  }
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
    direction: null
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      nextLocation.direction = 'up'
      break;
    case 'ArrowDown':
      nextLocation.i++;
      nextLocation.direction = 'down'
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      nextLocation.direction = 'left'
      break;
    case 'ArrowRight':
      nextLocation.j++;
      nextLocation.direction = 'right'
      break;
    default: return null;
  }
  return nextLocation;
}

function getAngleOfRotation(direction) {
  switch (direction) {
    case 'up':
      direction = 180;
      break;
    case 'down':
      direction = 0
      break;
    case 'left':
      direction = 90
      break;
    case 'right':
      direction = 270;

  }
  return direction
}