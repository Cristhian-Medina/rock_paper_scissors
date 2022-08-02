/* Tenemos 3 valores en el juego:
0 = piedra
1 = papel
2 = tijera
*/

let player1Wins = 0;
let player2Wins = 0;

/** Contiene la estructura HTML del componente de resultados 
 * y reemplaza los valores dinamicos del juego.
 * Pasando el parametro player1 como nulo pone en blanco el tablero.
 * @param {string} player1 es la seleccion (rock - paper - scissors) del jugador 1
 * @param {string} player2 es la seleccion (rock - paper - scissors) del jugador 2
 * @param {string} resultConfrontation dice el resultado de la confrontacion.
 * @return {HTMLElement} la estructura HTML.
 */
 function resultStructure(player1, player2, resultConfrontation) {
    if(player1 === null) {
        return `<div class="c-result-up ly-flex"></div>`;
    }

    return `
    <div class="c-result-up ly-flex">
        <div>
            <p class="c-result-image-title">PLAYER 1</p>
            <img src="assets/${player1}.png" class="c-result-image"/>
        </div>
        <p>VERSUS</p>
        <div>
            <p class="c-result-image-title">PLAYER 2</p>
            <img src="assets/${player2}.png" class="c-result-image"/>
        </div>
    </div>
    <div class="c-result-down">
        <p>${resultConfrontation}</p>
    </div>
    `;
}

/** Reinicia los valores del juego
 * @return {void} nada.
 */
function restartGame() {
    let renderScore1 = document.getElementById('score1');
    let renderScore2 = document.getElementById('score2');
    player1Wins = 0;
    player2Wins = 0;
    renderScore1.innerText = `${player1Wins} win`;
    renderScore2.innerText = `${player1Wins} win`;

    let toogle = document.getElementById('modal');
    toogle.classList.toggle('is-hidden');

    let result = document.getElementById('result');
    result.innerHTML = resultStructure(null);
}

/** Valida y muestra en un modal quien es el ganador de la confrontación.
 * @param {number} player1 numero de victorias del jugador 1.
 */
function showWinnerGame(player1) {
    let modal = document.getElementById('modal');
    modal.classList.remove('is-hidden');
    
    if(player1 === 3) {
        title = 'The winner is <b>THE PLAYER ONE</b>'
    } else {
        title = 'The winner is <b>THE PLAYER TWO</b>'
    }
    
    let modalTitle = `
        <h2 class="c-modal-title">${title}</h2>
        <div class="c-modal-btn" onClick="restartGame()">
            RESTART 
            <span class="icon-restart"></span>
        </div>
    `;
    modal.innerHTML = modalTitle;
}

/** Almacena la cantidad de victorias de cada jugador. 
 * si cualquiera de los jugadores gana una confrontacion se le suma 1 al contador.
 * si la confrontacion resulta en empate se le resta 1 a ambos juagadores.
 * @param {string} winner - contiene el ganador de la confrontación.
 * @return {void} nada.
 */
 function paintWinningCount(winner) {
    let renderScore1 = document.getElementById('score1');
    let renderScore2 = document.getElementById('score2');

    if(winner === 'score1') {
        player1Wins = player1Wins + 1;
        renderScore1.innerText = `${player1Wins} win`;
    } else if(winner === 'score2') {
        player2Wins = player2Wins + 1;
        renderScore2.innerText = `${player2Wins} win`;
    }
    
    if(player1Wins === 3 || player2Wins === 3) {
        showWinnerGame(player1Wins);
    }
}

/** Renderiza los resultados de la confrontacion.
 * @param {string} player1 - es la seleccion (rock - paper - scissors) del jugador 1.
 * @param {string} player2 - es la seleccion (rock - paper - scissors) del jugador 2.
 * @param {array} resultConfrontation - contiene el ganador de la confrontación y un mensaje alusorio.
 * @return {void} nada.
 */
function paintResult(player1, player2, winner) {
    paintWinningCount(winner[0]);
    let result = document.getElementById('result');
    result.innerHTML = resultStructure(player1, player2, winner[1]);
}

/** Valida si alguno de los jugadores gana o si empatan.
 * @param {string} player1 
 * @param {string} player2 
 * @return {array.<?string, string>} retorna el resultado de la confrontación.
 */
function verify(player1, player2) {
    if(player1 === player2) {
        return [null, 'The confrontation resulted in a tie'];
    } else if(player1 == 'rock' && player2 == 'scissors' 
            || player1 == 'paper' && player2 == 'rock'
            || player1 == 'scissors' && player2 == 'paper') {
        return ['score1', 'Player 1 is the WINNER!!!'];
    } else if(player2 == 'rock' && player1 == 'scissors' 
            || player2 == 'paper' && player1 == 'rock'
            || player2 == 'scissors' && player1 == 'paper') {
        return ['score2', 'Player 2 is the WINNER!!!'];
    }
}

/** Genera un numero aleatorio que concuerde con las opciones del juego
1. resuelve la operacion (max - min + 1)
2. genera un numero aleatorio entre 0 y 1 sin llegar a ser estos valores.
3. multiplica el numero aleatorio por el resultado del paso 1
4. suma el valor minimo mas el resultado del paso 3
5. elimina los decimales del resultado del paso 4
 * @param {number} min - numero minimo del rango de valores.
 * @param {number} max - numero máximo del rango de valores.
 * @return {number} retorna un numero aleatorio.
 */
function randomSelection(min, max) {
    return Math.floor(Math.random() * ( max - min + 1 ) + min);
}

/** Ejecuta el juego al seleccionar una opcion: 
 * 0 es piedra, 1 es papel, 2 es tijera.
 * @param {number} option la seleccion del jugador 1.
 * @return {void} nada. 
 */
function play(option) {
    let max = 2; // valor maximo de opciones en el juego
    let min = 0; // valor minimo de opciones en el juego

    let hands = {
        0: 'rock',
        1: 'paper',
        2: 'scissors',
    };

    let userHand = hands[option];

    let pcSelection = randomSelection(min, max);
    let pcHand = hands[pcSelection];

    let whoWin = verify(userHand, pcHand);
    
    paintResult(userHand, pcHand, whoWin);
}
