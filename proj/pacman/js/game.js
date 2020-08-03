'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '&#9702;'
const CHERRY = '🍒';

var gElModal = document.querySelector('.modal')
var gCherryInterval;

var gBoard;
var gGame;


function init() {
  gGame = {
    score: 0,
    isOn: false,
    foodNum: -1,
    eatenFoodNum: 0
  };
  gBoard = buildBoard();
  gElModal.style.display = "none"

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gGame.foodNum += 1;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gGame.foodNum -= 1;
      }
      if (i === 1 && j == 1 || i === 1 && j === SIZE - 2 || i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = SUPERFOOD;
        gGame.foodNum -= 1;
      }
    }
  }

  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver(winner) {
  if (winner) {
    console.log('hi');
    gElModal.innerHTML = '<h3>YOU ARE VICTORIOUS</h3><button onclick="init()">restart</button>'
  }
  gElModal.style.display = 'block'
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(gCherryInterval)
  gCherryInterval = null;
  
}

function addCherry() {
  var cell = getOpenCell(gBoard);
  if (!cell) return;
  gBoard[cell.i][cell.j] = CHERRY;
  renderCell(cell, CHERRY);
}







