/*
const dataNascimento = document.querySelector('#nascimento')
dataNascimento.addEventListener('blur', (evento) =>{ // Quando se perde o foco do campo
    validaDataNascimento(evento.target)
})
 */

const inputs = document.querySelectorAll('[data-tipo]');

/* document.querySelector('.formulario').addEventListener('submit', (evento)=> {
    evento.preventDefault()
    let tt = erro;
    debugger;
}) */

inputs.forEach(input => {    
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})
//Podemos acessar um data-atributes do input com dataset depois diz qual atribute.

function valida(input) {

    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo Nome não pode estar vazio.',
        customError: 'Deve conter no máximo 50 caracteres.'
    },
    email: {
        valueMissing: 'O campo Email não pode estar vazio.',
        customError: 'Insira um endereço de e-mail válido: "exemplo@exemplo.com".'
    },
    assunto: {
        valueMissing: 'O campo Assunto não pode estar vazio.',
        customError: 'O campo Assunto deve conter no máximo 50 caracteres.'
    },
    texto: {
        valueMissing: 'O campo Mensagem não pode estar vazio.',
        customError: 'O campo Mensagem deve conter no máximo 300 caracteres.'
    }
}

const validadores = {
    nome: input => validaNome(input),
    email: input => validaEmail(input),
    assunto: input => validaAssunto(input),
    texto: input => validaTexto(input)
}
const erros = {}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';
    tiposDeErro.forEach(erro => {
        if (input.validity[erro] && !mensagem) {
            mensagem = mensagensDeErro[tipoDeInput][erro];
        }
    })
    return mensagem
}

function validaNome(input) {
    const nomeRecebida = input.value;
    let mensagem = '';

    if (nomeRecebida.length > 50) {
        mensagem = 'O campo Nome deve conter no máximo 50 caracteres.'
    }

    input.setCustomValidity(mensagem) /*função específica do input que retorna uma string  */
}

function validaEmail(input) {
    /* debugger; */
    const emailRecebida = input.value.trim();
    let mensagem = '';

    const expressao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expressao.test(emailRecebida)) {
        mensagem = 'Insira um endereço de e-mail válido: "exemplo@exemplo.com".';
    }

    input.setCustomValidity(mensagem);
}


function validaAssunto(input) {
    const assuntoRecebido = input.value
    let mensagem = ''

    if (assuntoRecebido.length > 50) {
        mensagem = 'O campo Assunto deve conter no máximo 50 caracteres.'
    }
    input.setCustomValidity(mensagem)
}


function validaTexto(input) {
    const textoRecebido = input.value
    let mensagem = ''

    if (textoRecebido.length > 300) {
        mensagem = 'O campo Mensagem deve conter no máximo 300 caracteres.'
    }

    input.setCustomValidity(mensagem)
}