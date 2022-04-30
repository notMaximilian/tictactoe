const headerText = document.querySelector('#headerText')
const cells = document.querySelectorAll('.cell')
const button = document.querySelector('#gameButton')
const status = document.querySelector('#statusText')

button.addEventListener('click', event => {
    init();
})

const winConditions = [
    //horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal wins
    [0, 4, 8],
    [2, 4, 6],
]

let options = [ "", "", "", "", "", "", "", "", "" ]
let currentPlayer = ''
let running = false


function init(){
    button.innerHTML = "Reset"
    running = true
    currentPlayer = 'X'
    status.innerHTML = "Player X"
    cells.forEach(cell => cell.addEventListener('click', click))
    button.addEventListener('click', restartGame)
}

function click(){
    if (running){
        const cellIndex = this.getAttribute("cellIndex");
        if (options[cellIndex] != "" || !running){
            return;
        }
        updateCell(this, cellIndex)
        checkWinner()
    }
}

function updateCell(cell, index){
    cell.innerHTML = currentPlayer
    options[index] = currentPlayer
}

function changePlayer(){
    if (currentPlayer == "X"){
        currentPlayer = "O" 
        status.innerHTML = "Player O"
    } 
    else{
        currentPlayer = "X"
        status.innerHTML = "Player X"
    } 
}

function checkWinner(){
    let roundWon = false;

    for (let x=0; x < winConditions.length; x++){
        const condition = winConditions[x]
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]

        if (cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        console.log(`${cellA} ${cellB} ${cellC}`)
        if (cellA == cellB && cellB == cellC){
            roundWon = true
            break;
        }
    }

    if (roundWon){
        status.innerHTML = `Player ${currentPlayer} is the winner!`
        running = false
    }
    else{
        if (!options.includes("")){
            status.innerHTML = 'DRAW'
            running = false;
            return;
        }
        changePlayer()
    }
}

function restartGame(){
    cells.forEach(cell => cell.innerHTML = "")
    options = [ "", "", "", "", "", "", "", "", "" ]
    currentPlayer = ''

}