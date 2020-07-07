const insertCounter = document.querySelector('.pCounter');
const textArea = document.querySelector('#piu');
const button = document.querySelector('.btnSendPiu');
const piuArea = document.querySelector('.piuArea')

textArea.addEventListener("input", handlePiuInput);
button.addEventListener("click", handleSendPiu);

function handlePiuInput(e) {
    const length = e.target.value.length;

    if (length === 0) {
        insertCounter.innerHTML = '';
        return;
    }

    insertCounter.innerHTML = `${length}/140`
    insertCounter.style.color = `rgb(${255 / 100 * length}, ${255 * 80 / length}, 0)`;

    if (length > 140) {
        insertCounter.style.color = `rgb(255, 72, 72)`;
        textArea.style.border = 'solid 2px rgb(255, 72, 72)';

        button.style.opacity = '0.3';
        button.style.cursor = 'not-allowed';
    } else {
        textArea.style.removeProperty('border');
        button.style.cursor = 'pointer';
        button.style.opacity = '1';
    }
}

function handleSendPiu(e) {
    if (textArea.value.length <= 140 && textArea.value.length > 0) {
        const piuObj = {
            mensagem: textArea.value,
            nome: 'MEU NOME',
            imagem: '../../assets/elipse.png',
            username: '@meuuser',
            time: 0,
            likes: 0,
            myPiu: true,
        }

        const newPiu = createPiu(piuObj);

        piuArea.insertBefore(newPiu, piuArea.firstChild);

        textArea.value = '';
        insertCounter.innerHTML = '';

        return;
    }
}