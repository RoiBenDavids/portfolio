// '&#9781;';
const GHOST = ' 👻';


var gIntervalGhosts;
var gGhosts;
var gEatenGhosts = []

function createGhost(board) {

    var ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

// function renderGhosts(){
// for (var i = 0; i < gGhosts.length; i++){
//     var ghost = gGhosts[i];

// }
// }

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        var nextLocation = getRandomPossibleMove(ghost);
        var nextCel = gBoard[nextLocation.i][nextLocation.j]

        if (nextCel === FOOD) {
            ghost.currCellContent = FOOD;
        }
        if (nextCel === CHERRY) {
            ghost.currCellContent = CHERRY;
        }
        if (nextCel === SUPERFOOD) {
            ghost.currCellContent = SUPERFOOD;
        }

        // if PACMAN - gameOver
        if (nextCel === PACMAN) {
            if (gPacman.isSuper) {
                console.log('stupid', ghost.location);
                eatGhost(ghost.location);
                setTimeout(returnGhosts, 5000,);
                return
            }
            else {
                gameOver()
                return
            }
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}
function renderGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}
function getGhostHTML(ghost) {
    return `<span class="ghost" style="text-shadow: 0 0 0 ${gPacman.isSuper ? 'blue' : ghost.color};">${GHOST}</span>`
}

function eatGhost(cell, flag) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === cell.i && gGhosts[i].location.j === cell.j) {
            
            // if function came from pacman, add the points relevant and clear the content of ghost before eating it
            if (flag) {
                if (gGhosts[i].currCellContent === FOOD) {
                    updateScore(1);
                    gGame.eatenFoodNum++;
                    if (gGame.eatenFoodNum === gGame.foodNum) gameOver(true);
                }
                if (gGhosts[i].currCellContent === CHERRY){
                    updateScore(10);

                }
                gGhosts[i].currCellContent= EMPTY;
            }
            var ghostToKill = gGhosts.splice(i, 1)[0];
            gEatenGhosts.push(ghostToKill);
            gBoard[cell.i][cell.j] = EMPTY;

        }
    }
    console.log(gEatenGhosts[gEatenGhosts.length - 1].currCellContent)
    renderCell(cell, gEatenGhosts[gEatenGhosts.length - 1].currCellContent)
}

function returnGhosts() {
    cell = gEatenGhosts[0].location
    gBoard[cell.i][cell.j] = GHOST;
    gGhosts.push(gEatenGhosts.splice(0, 1)[0]);

    renderCell(cell, getGhostHTML(gGhosts[gGhosts.length - 1]))
}


function getFreeLocation(ghost) {
    var didMove = false;
    var count = 0;
    while (!didMove || count < 10) { }
    moveDiff = getMoveDiff();
    nextLocation =
    {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    nextCel = gBoard[nextLocation.i][nextLocation.j]
    console.log(nextCel);
    if (nextCel !== WALL || nextCel !== GHOST) {
        didMove = true
        console.log('entered');
    }
    count++

    return nextLocation
}

function getRandomPossibleMove(ghost) {
    var possibleMoves = []
    var origI = ghost.location.i;
    var origJ = ghost.location.j;
    if (gBoard[origI + 1][origJ] !== GHOST && gBoard[origI + 1][origJ] !== WALL) {
        possibleMoves.push({ i: origI + 1, j: origJ })
    }
    if (gBoard[origI - 1][origJ] !== GHOST && gBoard[origI - 1][origJ] !== WALL) {
        possibleMoves.push({ i: origI - 1, j: origJ })
    }
    if (gBoard[origI][origJ + 1] !== GHOST && gBoard[origI][origJ + 1] !== WALL) {
        possibleMoves.push({ i: origI, j: origJ + 1 })
    }
    if (gBoard[origI][origJ - 1] !== GHOST && gBoard[origI][origJ - 1] !== WALL) {
        possibleMoves.push({ i: origI, j: origJ - 1 })
    }

    return possibleMoves[getRandomIntInclusive(0, possibleMoves.length - 1)]


}





