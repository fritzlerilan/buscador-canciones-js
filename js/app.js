import * as UI from './interfaz.js';

document.addEventListener('DOMContentLoaded', function() {
    UI.formulario.addEventListener('submit', validarFormulario); 
});

function validarFormulario(e) {
    e.preventDefault();
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;
    if (artista === '' || cancion === '') {
        mostrarError('Todos los campos son obligatorios');
        return;
    } 
    buscarCancion(artista, cancion);
}

function buscarCancion(artista, cancion){
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.lyrics){
                mostrarResultado(data.lyrics);
            }else{
                limpiarLetra();
                mostrarError('La canción no pudo ser encontrada');
            }
        })
}
function limpiarLetra(){
    UI.divLetra.innerHTML = '';
}

function mostrarResultado(letra) {
    UI.divLetra.innerHTML = letra;
}
function mostrarError(mensaje) {
    UI.divMensajes.innerHTML = `<p>${mensaje}</p>`;
    UI.divMensajes.classList.add('error');
    setTimeout(() => {
        UI.divMensajes.innerHTML = '';
        UI.divMensajes.classList.remove('error');
    }, 3000);
}