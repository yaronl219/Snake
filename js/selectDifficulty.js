'use strict'

var gCurrentSelection = 1

function setDifficulty(val) {
    var newSel = gCurrentSelection + val
    if (newSel < 1 || newSel > 9) return
    var selToRemove = document.querySelector(`.diff${gCurrentSelection}`)
    var selToHighlight = document.querySelector(`.diff${newSel}`)
    selToRemove.classList = `diff-unselected diff${gCurrentSelection}`
    selToHighlight.classList = `diff-selected diff${newSel}`
    gCurrentSelection = newSel
}

function changeDifficultySelection(event) {
    switch (event.key) {
        case ('ArrowUp'):
            setDifficulty(-1)
            renderKeyPress(2)
            break;
        case ('ArrowDown'):
            setDifficulty(1)
            renderKeyPress(8)
            break;
        case ('Enter'):
            renderKeyPress('Select')
            gLevel.difficulty = gCurrentSelection
            startLevel()
            randomizePhoneColor()
            break;
        default:
            // if the player entered an invalid key - do nothing
            return
    }
}

function renderDifficultyScreen() {
    var scoreEl = document.querySelector('.score-area')
    scoreEl.innerText = ''
    var strHTML = '<div class="diff-header">Select Difficulty:</div><table class="game-screen-mat" ><tbody>';
    // strHTML += '<tr><td class="diff-selected diff1">1</td></tr>'
    for (var i = 1; i <= 9; i++) {
        strHTML += '<tr>';
        strHTML += '<td class="diff-unselected diff' + i + '">' + i + '</td>'
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.phone-screen');
    elContainer.innerHTML = strHTML;
    setDifficulty(0)
}