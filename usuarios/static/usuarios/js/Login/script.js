const submitBtn = document.querySelector('button');
const form = document.querySelector('form');

//Lidando com Submit do formulario
submitBtn.addEventListener('click', handleSubmit)

function handleSubmit(e) {
    //Verificando Inputs
    if (form.email.value.length === 0) {
        errorIn('email');
        return;
    } else if (form.password.value.length === 0) {
        errorIn('password');
        return;
    }

    // const response = fetch(url, form);

    //Tire do comentario algum dos objetos a seguir para testar possiveis cenarios de resposta do backend

    const response = { status: 200, data: { token: 'Fake-Token' } };
    // const response = { status: 400, data: { error: 'Email nao encontrado', errorInputs: 'email' } };
    // const response = { status: 400, data: { error: 'Senha incorreta', errorInputs: 'password' } };

    //Request com erro
    if (response.status !== 200) {
        const divError = document.createElement('p');
        divError.innerHTML = response.data.error;
        divError.classList.add('error');

        const insertingDiv = document.querySelector('[insert]');
        insertingDiv.appendChild(divError);

        const border = document.querySelector(`#${response.data.errorInputs}`);
        border.classList.add('red-border');
    } else {
        //Request sem erro

        //Colocando token vindo do backend e redirecionando
        localStorage.setItem('piupiuwer-token', response.data.token);
        window.location.href = '../feed/index.html';
    }
}

function errorIn(id) {
    const verifyBorder = document.querySelector('.red-border');
    if (verifyBorder) {
        verifyBorder.classList.remove('red-border');
    }

    const input = document.querySelector(`#${id}`);
    input.classList.add('red-border');

    const verify = document.querySelector('.error');
    if (verify) {
        verify.remove();
    }

    const insertingDiv = document.querySelector('[insert]');
    const divError = document.createElement('p');

    divError.innerHTML = `Favor preencher: ${id}`
    divError.classList.add('error');
    insertingDiv.appendChild(divError);
}