'use strict'



var gSnakeObject = {
    headPos: [5, 5],
    headRep: 'h',
    bodyPos: [
        [5, 6]
    ],
    bodyRep: 'b',
    tailPos: [5, 7],
    tailRep: 't',
    removeTail: [],
    removeTailRep: ' ',
    nextDirection: 'dirDown',
    lastDirection: 'dirLeft',
    newHeadLoction: []
}

function checkNewCoordsBehavior() {
    // getting the coords
    var x = gSnakeObject.newHeadLoction[0]
    var y = gSnakeObject.newHeadLoction[1]
        // if the next cell is empty
    if (gBoard[x][y] === ' ') {
        advanceSnake()
    } else if (gBoard[x][y] === 'apple') {
        // generate a new apple
        generateApple()
            // advance the snake without cutting its tail
        advanceSnake(true)
            // raise the score by one
        raiseScore()
    } else {
        // if the cell is not empty and not an apple - its the snake's body or wall and should fail the level
        gameOver()
    }
}

function getNewCoords() {
    var direction = gSnakeObject.nextDirection
    var currCords = gSnakeObject.headPos
    switch (direction) {
        case 'dirLeft':
            var nextCoords = ([currCords[0], currCords[1] - 1])
            break;
        case 'dirRight':
            var nextCoords = ([currCords[0], currCords[1] + 1])
            break;
        case 'dirUp':
            var nextCoords = ([currCords[0] - 1, currCords[1]])
            break;
        case 'dirDown':
            var nextCoords = ([currCords[0] + 1, currCords[1]])
            break;
    }
    // if the snake's direction will force it bank into it's body - overide and change the next direction to the last known direction
    // console.log('compare', gSnakeObject.bodyPos[0][0] === nextCoords[0] && gSnakeObject.bodyPos[0][1] === nextCoords[1])
    if (gSnakeObject.bodyPos[0][0] === nextCoords[0] && gSnakeObject.bodyPos[0][1] === nextCoords[1]) {
        console.log('wrong direction')
        gSnakeObject.nextDirection = gSnakeObject.lastDirection
        getNewCoords()
    } else {
        // else - save the new direction to the last direction
        gSnakeObject.lastDirection = gSnakeObject.nextDirection
        gSnakeObject.newHeadLoction = nextCoords
            // console.log(nextCoords)
    }

}

function buildSnake(firstBuild = true) {
    // update head
    gBoard[gSnakeObject.headPos[0]][gSnakeObject.headPos[1]] = gSnakeObject.headRep
        // update tail
    gBoard[gSnakeObject.tailPos[0]][gSnakeObject.tailPos[1]] = gSnakeObject.tailRep
        // loop over body and build
    for (var i = 0; i < gSnakeObject.bodyPos.length; i++) {
        gBoard[gSnakeObject.bodyPos[i][0]][gSnakeObject.bodyPos[i][1]] = gSnakeObject.bodyRep
    }
    if (gSnakeObject.removeTail.length > 0) {
        gBoard[gSnakeObject.removeTail[0]][gSnakeObject.removeTail[1]] = gSnakeObject.removeTailRep
    }
    if (firstBuild) {
        // if this is the first time building the snake - render the whole board
        printMat(gBoard, '.phone-screen')
    } else {
        // only render the snake
        renderSnake()
    }
}

function advanceSnake(hasEaten = false) {
    var newCoords = gSnakeObject.newHeadLoction
        // adding the previous head location to the beginning of an array
    gSnakeObject.bodyPos.unshift(gSnakeObject.headPos)
        // the snake head should go in the direction
    gSnakeObject.headPos = newCoords
        // if snake has not eaten - add it to the end of the array
    if (!hasEaten) {
        gSnakeObject.removeTail = gSnakeObject.tailPos;
        gSnakeObject.tailPos = gSnakeObject.bodyPos.pop()
    } else {
        // if the snake has eaten - do not remove the tail block
        gSnakeObject.removeTail = []
    }
    buildSnake(false)
        // renderSnake()
}