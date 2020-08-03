'use strict'
var gLevel = {
    isGamePaused: false,
    score: 0,
    difficulty: 1
}

var gBoard;
var gInterval;

function pauseGame() {
    if (!gLevel.isGamePaused) {
        gLevel.isGamePaused = true
        renderGameOverModal('PAUSED')
        clearInterval(gInterval)
    } else {
        gLevel.isGamePaused = false
        renderGameOverModal()
        gInterval = setInterval(function() {
            getNewCoords()
            checkNewCoordsBehavior()
        }, 500 - (gLevel.difficulty * 50))
    }
}

function randomizeSnakeStartLocation() {
    // this block of code selects a random starting location for the snake and the direction
    var randXAxis = getRandomInteger(4, gBoard.length - 4, false)
    var randYAxis = getRandomInteger(4, gBoard.length - 4, false)
    var possibleDirections = ['dirLeft', 'dirRight', 'dirUp', 'dirDown']
    var randomDirection = getRandomInteger(0, 4, false)
        // build the snake's location in the random location chosen
    gSnakeObject.headPos = [randXAxis, randYAxis]
        // according to the random direction - build the snake's body and tail in the opposite location
    switch (randomDirection) {
        case (0):
            gSnakeObject.nextDirection = possibleDirections[0]
            gSnakeObject.bodyPos = [
                [randXAxis, randYAxis + 1]
            ]
            gSnakeObject.tailPos = [randXAxis, randYAxis + 2]
            break;
        case (1):
            gSnakeObject.nextDirection = possibleDirections[1]
            gSnakeObject.bodyPos = [
                [randXAxis, randYAxis - 1]
            ]
            gSnakeObject.tailPos = [randXAxis, randYAxis - 2]
            break;
        case (2):
            gSnakeObject.nextDirection = possibleDirections[2]
            gSnakeObject.bodyPos = [
                [randXAxis + 1, randYAxis]
            ]
            gSnakeObject.tailPos = [randXAxis + 2, randYAxis]
        case (3):
            gSnakeObject.nextDirection = possibleDirections[3]
            gSnakeObject.bodyPos = [
                [randXAxis - 1, randYAxis]
            ]
            gSnakeObject.tailPos = [randXAxis - 2, randYAxis]
    }
    gSnakeObject.lastDirection = gSnakeObject.nextDirection

}

function raiseScore() {
    gLevel.score++;
    renderScoreChange()
}

function gameOver() {
    console.log('lost')
    clearInterval(gInterval)
    gBoard = []
    renderPhoneImage('game')
    renderGameOverModal(`Game Over \n\n You\'ve collected ${gLevel.score} apples. \n\n Would you like to play again? \n\n (press select to continue)`)
}

function startLevel() {
    // reset the board
    gBoard = buildBoard()
        // reset the score
    gLevel.score = 0
        // render the phone image
    renderPhoneImage('game')
    randomizeSnakeStartLocation()
    buildSnake()
    generateApple()
    gameInterval()

}

function gameInterval() {
    gInterval = setInterval(function() {
        getNewCoords()
        checkNewCoordsBehavior()
    }, 500 - (gLevel.difficulty * 50))
}

function generateApple() {
    var possibleCoordsArray = getEmptyCells()
    var randIdx = getRandomInteger(0, possibleCoordsArray.length, false)
        // console.log(possibleCoordsArray)
        // console.log(randIdx)
        // console.log(possibleCoordsArray[randIdx])
    var nextAppleCoords = possibleCoordsArray[randIdx]
    console.log(nextAppleCoords)
    gBoard[nextAppleCoords[0]][nextAppleCoords[1]] = 'apple'
        // renderPhoneImage('game')
    printMat(gBoard, '.phone-screen')
    randomizePhoneColor()
}