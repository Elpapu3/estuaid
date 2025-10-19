
const replaceAt = (string, character, index) => {
  return string.substring(0, index) + character + string.substring(index + character.length);
};

let pala = ['mono','perro','gato'];
let cont_core=0;
let pala_Secre = pala[Math.floor(Math.random()*pala.length)];
let eror_comt=0;
let guion = pala_Secre.replace(/./g, "_ ");
document.querySelector('.guion').innerHTML = guion;

let cont_maxe = 6;


const verificar = () =>{
    const input = document.querySelector('input');
    const letter = input.value.toLowerCase();
    input.value = '';
    input.focus();

    let eror = true;

    for(let i=0; i<pala_Secre.length; i++){
        if(pala_Secre[i] === letter){
                guion=replaceAt(guion, letter, i*2);
                eror = false;                
        }
    }

    document.querySelector('.guion').innerHTML = guion;
    if(eror){
        eror_comt++;

        document.querySelector('#imagen').src = `img/${eror_comt}.png`;
        if(eror_comt >= cont_maxe){
            document.querySelector('p').textContent = `perdiste la palabra era ${pala_Secre}`;
            document.querySelector('button').disabled = true;
            document.querySelector('#imagen').style.display = 'none';
             input.disabled = true; 
        }
    }
      if (!guion.includes("_")) {
        document.querySelector('p').textContent = `ganaste`;
        document.querySelector('button').disabled = true;
        input.disabled = true;
  }

};
document.querySelector('button').addEventListener('click', chequear);