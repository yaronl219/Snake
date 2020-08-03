'use strict'

function renderGameOverModal(innerText) {
    var el = document.querySelector('.game-over-modal')
        // console.log()
    if (el.hidden === true) {
        el.hidden = false
        el.innerText = innerText
    } else {
        el.hidden = true
        el.innerText = ''
    }
}

function renderScoreChange() {
    var scoreEl = document.querySelector('.score-area')
    scoreEl.innerText = `Score: ${gLevel.score}`
}

function renderSnake() {
    // this should only render the head location and the tail location
    renderSnakeHead()
    renderSnakeTail()
}

function renderSnakeTail() {
    // checking the coords for the tail
    var tailCoors = gSnakeObject.removeTail
        // if there is no tail to remove - exit the function
    if (tailCoors.length === 0) return
        // find the tail element and update it to be background
    var tailEl = document.querySelector(`.cell${tailCoors[0]}-${tailCoors[1]}`)
    tailEl.classList = `cell cell${tailCoors[0]}-${tailCoors[1]}`
}

function renderSnakeHead() {
    // checking the coords for the head
    var headCoors = gSnakeObject.newHeadLoction
        // find the head element and update it to be background
    var headEl = document.querySelector(`.cell${headCoors[0]}-${headCoors[1]}`)
    headEl.classList = `cell cell${headCoors[0]}-${headCoors[1]} snake`
}


function renderPhoneImage(content) {
    // 
    var phoneArea = document.querySelector('#phone')
    phoneArea.innerHTML = gPhoneImageStr
    if (content === "game") {
        console.log('game')
        renderScoreChange()
        printMat(gBoard, '.phone-screen')
    } else if (content === 'diff') {
        renderDifficultyScreen()
    }
}

function printMat(mat, selector) {
    var strHTML = '<table class="game-screen-mat" ><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            if (gBoard[i][j] === 'wall') {
                strHTML += '<td class="wall ' + className + '"> </td>'
            } else if (gBoard[i][j] === 'apple') {
                strHTML += '<td class="apple ' + className + '"></td>'

            } else if (gBoard[i][j] !== ' ') {
                strHTML += '<td class="snake ' + className + '"> </td>'
            } else {
                strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
            }
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function buildBoard() {
    // to be changed later - i is 27, j is 30
    var width = 27
    var height = 30
    var board = [];
    for (var i = 0; i < width; i++) {
        board.push([]);
        for (var j = 0; j < height; j++) {
            if (i === 0 || j === 0 || i === width - 1 || j === height - 1) {
                board[i][j] = 'wall'
            } else {
                board[i][j] = ' ';
            }
        }
    }

    return board;
}

function KeyPress(event) {
    // if the board has not been defined - it means we are in the difficulty screen
    if (gBoard === undefined) return changeDifficultySelection(event)
    switch (event.key) {
        case ('ArrowUp'):
            gSnakeObject.nextDirection = "dirUp"
            renderKeyPress(2)
            break;
        case ('ArrowDown'):
            gSnakeObject.nextDirection = "dirDown"
            renderKeyPress(8)
            break;
        case ('ArrowLeft'):
            gSnakeObject.nextDirection = "dirLeft"
            renderKeyPress(4)
            break;
        case ('ArrowRight'):
            gSnakeObject.nextDirection = "dirRight"
            renderKeyPress(6)
            break;
        case ('Enter'):
            renderKeyPress('Select')
                // if the board's length is zero - this means the game was finished and cleared
            if (gBoard.length === 0) {
                // reset the gBoard
                gBoard = undefined
                    // close the game over modal
                renderGameOverModal()
                    // reset the difficulty
                console.log(gLevel.difficulty)
                    // and render the difficulty screen
                renderDifficultyScreen()
            } else {
                // if not - this means to activate the pause game
                pauseGame()
            }
            break;
        default:
            // if the player entered an invalid key - do nothing
            return
    }
    console.log(gSnakeObject.nextDirection)
    getNewCoords()
    checkNewCoordsBehavior()
}

function renderKeyPress(keypress, timeHighlighted = 150) {
    // grabs the element of the corresponding number and highlights it
    var pressedButton = document.querySelector('#button' + keypress).firstChild
    pressedButton.style.fill = 'rgb(255, 199, 96)'
        // set amount of time - calling the key release function
    setTimeout(function() {
            renderKeyRelease(keypress)
        }, timeHighlighted)
        // console.log(pressedButton)
}

function renderKeyRelease(keypress) {
    // key release changes the color back to regular
    var pressedButton = document.querySelector('#button' + keypress).firstChild
    pressedButton.style.fill = '#f7f7d7'
}