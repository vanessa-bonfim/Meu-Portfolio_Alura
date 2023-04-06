import { valida } from "./validacao.js";
const inputs = document.querySelectorAll('[data-tipo]');

inputs.forEach(input => {    
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})
