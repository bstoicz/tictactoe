
// Gameboard module
const gameBoard = (() => {

    // board array
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push("");
    }

    // individual squares
    let squares = document.querySelector(".grid-container");

    board.forEach((item, index) => {
        const square = document.createElement('div');
        square.className = "grid-item";
        squares.appendChild(square);
    })

    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            // display active player marker
            //square.classList.add(game.activePlayer.marker);
            square.innerHTML = game.activePlayer.marker;
            // update array value to be that of active player
            board[index] = game.activePlayer.marker;
            // remove event listener from the marked index
            square.style.pointerEvents = 'none';
            // update remainingSpots
            game.boardSpots -= 1;
            // check winner
            game.checkWinner();
            // check remaining spots
            if (game.haveWinner == false) {
                if (game.boardSpots > 0) {
                    game.nextPlayer();
                } else if (game.boardSpots == 0) {
                    game.declareTie();
                }
            }
        })
    });

    return {board};
    
})();

// Player create factory function
const createPlayer = (name, marker) => {
    return {name, marker}
}



// Render function
function render() {

}

// Game module
const game = (() => {

    // Create players
    const player1 = createPlayer("X's","X");
    const player2 = createPlayer("O's","O");

    // Initialize start
    let activePlayer = player1;
    let haveWinner = false;
    let boardSpots = 9;

    // Selectors
    let winnerText = document.querySelector('.winner-text'); 

    // Winning combinations
    const winningComb = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // check for winner function

    function checkWinner () {
        winningComb.forEach((item, index) => { 
            if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
                winnerText.innerHTML = `<b>${this.activePlayer.name} wins</b>`;
                this.haveWinner = true;
            } 
        })
    }
    
        // next player
        function nextPlayer() {
            this.activePlayer === player1 ? this.activePlayer = player2 : this.activePlayer = player1;
            console.log('nextPlayer() function ran')
            console.log('active player: ' + activePlayer.name);
        }
    
        // declare tie
        function declareTie() {
            winnerText.innerHTML = "<b>Tie game</b>";
        }
    
        // return
        return {
            activePlayer,
            boardSpots,
            checkWinner,
            nextPlayer,
            declareTie,
            haveWinner
        };

})();