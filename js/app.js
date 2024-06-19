//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]



/*---------------------------- Variables (state) ----------------------------*/
let turn 
let winner 
let tie 
let board
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
console.dir(squareEls)
const messageE1 = document.querySelector('#message')
console.dir(messageE1)
const reset = document.querySelector('#reset')


/*-------------------------------- Functions --------------------------------*/
function init(){
    turn = 'X'
    winner = false
    tie = false
    board = ['', '', '', '', '', '', '', '', '']

    render()
}

function render(){
    updateBoard()
    updateMessage()
}

function updateBoard(){
    board.forEach((sqr, i) => {
        squareEls[i].innerHTML = `${board[i]}`;
    })
}

function updateMessage() {
    if(winner === false && tie === false){
        if(turn === 'X'){
            messageE1.innerText = 'X it is your turn'
        }else if (turn === 'O'){
            messageE1.innerText = 'O it is your turn'
        }       
    }else if (winner === false && tie === true){
        messageE1.innerText = 'The game is a draw'
    }else{
        messageE1.innerText = `${turn} has won the round`
    }
}

function handleClick(event){
    const squareIndex = event.target.id
    if(board[squareIndex] !== ''){
        return
    }else if(winner === true){
        return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function placePiece(index){
    board[index] = turn
}

function checkForWinner(){
    winningCombos.forEach((combo) => {
        combo.forEach((i) =>{
            if(board[i] === ""){
                return
            }else if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]){
                winner = true
            }
        })

    })
}


function checkForTie(){
    if(winner === true){
        return
    }else if(!board.includes('')){
        tie = true
        console.log('tie')
    }
     
}

function switchPlayerTurn(){
    if (winner === true || tie === true){
        return
    } else if (turn === 'X'){
        turn = 'O'
    } else if(turn === 'O'){
        turn = 'X'
    }
}

init()
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) =>{
    square.addEventListener('click', handleClick)
})

reset.addEventListener('click', init)