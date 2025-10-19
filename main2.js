const url_per = 'https://api.jikan.moe/v4/anime/1/characters'; // ID válido
let per = [];
let cont = 0;
let cont1 = 0; // correctas
let cont2 = 0; // incorrectas
let segundos = 5;  // contador
let intervalID;     // ID del setInterval

fetch(url_per)
.then(response => response.json())
.then(data => {
    per = data.data.map(p => ({
        nombre: p.character.name,
        imagen: p.character.images.jpg.image_url
    }));

    crear_quiz(); // iniciamos el quiz
});

function crear_quiz(){
    clearInterval(intervalID); // limpiar interval anterior

    if(cont >= 5){ // solo 5 preguntas
        
        document.querySelector('.text').textContent = 
            `Tus respuestas correctas: ${cont1}, incorrectas: ${cont2}`;
        document.querySelector('#img').style.display = 'none';
    document.querySelector('.op').style.display = 'none';
    document.querySelector('.temp').style.display = 'none';
      document.querySelector('h1').style.display = 'none';

        return;
    }

    cont++;
    let tiempo = 15;
    let img = document.querySelector('#img');
    let contenedor = document.querySelector('.op');
    let tempDiv = document.querySelector('.temp');
    contenedor.innerHTML = '';

    // Personaje correcto
    const rm = Math.floor(Math.random() * per.length);
    const personajeCorrecto = per[rm];
    img.src = personajeCorrecto.imagen;

    // Opciones: 1 correcta + 3 aleatorias
    let opciones = [personajeCorrecto.nombre];
    while(opciones.length < 4){
        const r = Math.floor(Math.random() * per.length);
        const nombre = per[r].nombre;
        if(!opciones.includes(nombre)) opciones.push(nombre);
    }
    opciones.sort(() => Math.random() - 0.5);

    // Crear botones
    opciones.forEach(nombre => {
        let btn = document.createElement('button');
        btn.textContent = nombre;

        btn.onclick = () => {
            clearInterval(intervalID);
            if(nombre === personajeCorrecto.nombre) cont1++;
            else cont2++;
            crear_quiz();
        }

        contenedor.appendChild(btn);
    });

    // Temporizador
    tempDiv.textContent = `Tiempo: ${tiempo}s`;
    intervalID = setInterval(() => {
        tiempo--;
        tempDiv.textContent = `Tiempo: ${tiempo}s`;
        if(tiempo <= 0){
            clearInterval(intervalID);
            alert(`Se acabó el tiempo! Era ${personajeCorrecto.nombre}`);
            cont2++;
            crear_quiz();
        }
    }, 1000);
}
