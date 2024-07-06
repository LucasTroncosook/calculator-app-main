const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);
const $id = (el) => document.getElementById(el);

const toggle = $('header nav > div a');
const containerCalculadora = $('.calculadora');
const containerNumeros = $$('.container-calculadora div a');
const resultado = $id('resultado');
const btnResultado = $id('resultadoFinal');
const btnDel = $id('del');

const toggleTheme = (e) => {
    e.preventDefault();
    let dataId = e.target.dataset.id;
    if (dataId === '1') {
        e.target.setAttribute('data-id', '2');
        containerCalculadora.setAttribute('data-id', '2');
    } else if (dataId === '2') {
        e.target.setAttribute('data-id', '3');
        containerCalculadora.setAttribute('data-id', '3');
    } else {
        e.target.setAttribute('data-id', '1');
        containerCalculadora.setAttribute('data-id', '1');
    }
}

toggle.addEventListener('click', toggleTheme);

const separarPorSignos = (string) => {
    let caracteres = string.split('');
    let resultado = [];
    let numeroActual = '';

    for (let i = 0; i < caracteres.length; i++) {
        let char = caracteres[i];

        if (["+", "-", "x", "/"].includes(char)) {
            if (numeroActual !== '') {
                resultado.push(numeroActual);
                numeroActual = '';
            }
            resultado.push(char);
        } else {
            numeroActual += char;
        }
    }

    if (numeroActual !== '') {
        resultado.push(numeroActual);
    }

    return resultado;
};

const evaluarExpresion = (operador1, operador, operador2) => {
    switch (operador) {
        case '+':
            return Number(operador1) + Number(operador2);
        case '-':
            return Number(operador1) - Number(operador2);
        case '/':
            return Number(operador1) / Number(operador2);
        case 'x':
            return Number(operador1) * Number(operador2);
    }
}

const procesarCalculo = (array) => {
    let i = 0;

    while (i < array.length) {
        if (array[i] === "x" || array[i] === "/") {
            const result = evaluarExpresion(array[i - 1], array[i], array[i + 1]);
            array.splice(i - 1, 3, result.toString());
            i -= 1;
        } else {
            i++;
        }
    }

    i = 0;
    while (i < array.length) {
        if (array[i] === "+" || array[i] === "-") {
            const result = evaluarExpresion(array[i - 1], array[i], array[i + 1]);
            array.splice(i - 1, 3, result.toString());
            i -= 1;
        } else {
            i++;
        }
    }

    return array[0];
}

const dibujarResultadoFinal = (resultadoFinal) => {
    resultado.textContent = resultadoFinal;
}

reset.addEventListener('click', function(){
    resultado.textContent = '0'
})

btnDel.addEventListener('click', function() {
    if (resultado.textContent.length > 1) {
        resultado.textContent = resultado.textContent.slice(0, -1);
    } else {
        resultado.textContent = '0';
    }
});

btnResultado.addEventListener('click', (e) => {
    e.preventDefault();
    const calculo = separarPorSignos(resultado.textContent);
    const resultadoFinal = procesarCalculo(calculo);
    dibujarResultadoFinal(resultadoFinal);
});

const validarLength = (valor) => {
    if (resultado.textContent === '0' && !isNaN(valor)) {
        resultado.textContent = valor;
    } else {
        resultado.textContent += valor;
    }
}

containerNumeros.forEach(numero => {
    numero.addEventListener('click', function(e) {
        e.preventDefault();
        const value = e.target.textContent;

        if (value === '=' || value === "del" || value === "reset") {
            return;
        }

        validarLength(value);
    });
});
