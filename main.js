let cont = 0;
let cuadr = [0,0,0,0,0,0,0,0,0];

let tablero = document.querySelector('.tablero');

// Crear 9 botones
for(let i = 0; i < 9; i++){
    let btn = document.createElement('button'); // crear nuevo botón
    btn.onclick = pulsa;
    btn.dataset.i = i;
    tablero.append(btn);
}

function pulsa(e){
    let btn = e.target;
    let t = cont & 1 ? 'O' : 'X';
    btn.textContent = t;
    btn.disabled = true;  
    cuadr[btn.dataset.i] = t; 
    cont++;
    let winner = revi();
    if(winner){
        document.querySelector('h1').textContent = `Ganó ${winner}`;
    } else if (cont === 9){
        document.querySelector('h1').textContent = 'Empate 😐';
    }
}

function revi(){
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6]             // diagonales
    ];

    for (let [i, j, k] of combos) {
        if (cuadr[i] && cuadr[i] === cuadr[j] && cuadr[i] === cuadr[k]) {
            return cuadr[i];
        }
    }
    return false;
}

function reset() {
    let btns = document.querySelectorAll('.tablero button'); // corregido
    for (let btn of btns) {
        btn.disabled = false;
        btn.textContent = '';
    }
    document.querySelector('h1').textContent = `Tateti`;
    cuadr = [0,0,0,0,0,0,0,0,0];
    cont = 0;
}
