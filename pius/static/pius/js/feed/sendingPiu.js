const insertCounter = document.querySelector('.pCounter');
const textArea = document.querySelector('.piuInput textarea');
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
    console.log(textArea)
    // if (textArea.value.length >= 140 || textArea.value.length <= 0) {
    //     event.preventDefault();
    //     console.log()

    //     textArea.value = '';
    //     insertCounter.innerHTML = 'Piu Inválido';

    //     return;
    // }
}