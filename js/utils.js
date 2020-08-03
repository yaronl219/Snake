function getEmptyCells() {
    var emptyCellArray = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === ' ') {
                emptyCellArray.push([
                    [i],
                    [j]
                ])
            }
        }
    }
    return emptyCellArray
}

function getRandomInteger(min, max, isIncluse = true) {
    var inclusive = (isIncluse) ? 0 : 1
    return Math.floor(Math.random() * ((max - inclusive) - (min - 1))) + min
}

function getRandomColor() {
    var r = getRandomInteger(0, 255)
    var g = getRandomInteger(0, 255)
    var b = getRandomInteger(0, 255)
    return `rgb(${r}, ${g}, ${b})`
}