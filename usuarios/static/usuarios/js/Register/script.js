const url = getURL();
const submitBtn = document.querySelector('button');
const form = document.querySelector('form');

//Lidando com Submit do formulario
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    //Verificando inputs
    if (form.name.value.length === 0) {
        errorIn('name');
        return;
    } else if (form.email.value.length === 0) {
        errorIn('email');
        return;
    } else if (form.user.value.length === 0) {
        errorIn('user');
        return;
    } else if (form.passwordA.value.length === 0) {
        errorIn('passwordA');
        return;
    } else if (form.passwordB.value.length === 0) {
        errorIn('passwordB');
        return;
    }

    if (!passwordsCheck())
        return;

    // Adquirindo objeto de configuracao da rota
    // const config = getConfig('POST');

    // Realizando a requisicao (prototipo)
    // const response = fetch(url, form);

    //Tire do comentario algum dos objetos a seguir para testar possiveis cenarios de resposta do backend
    // Exemplos de response do servidor
    const response = { status: 200, data: { token: 'Fake-Token' } };
    // const response = { status: 400, data: { errorInputs: ['email'], error: 'Email ja usado' } };
    // const response = { status: 400, data: { errorInputs: ['user'], error: 'User ja usado' } };

    //Request com erro
    if (response.status !== 200) {
        //Criando mensagem de erro
        const divError = getErrorMessage(response);

        const insertingDiv = document.querySelector('[insert]');
        insertingDiv.appendChild(divError);

        const data = response.data;
        for (let i = 0; i < data.errorInputs.length; i++) {
            const tempDiv = document.querySelector(`#${data.errorInputs[i]}`);
            tempDiv.classList.add('red-border');
        }
    } else {
        //Request sem erro
        const divSuccess = document.createElement('p');
        divSuccess.innerHTML = 'Cadastrado com sucesso! Verifique seu e-mail';
        divSuccess.classList.add('success');

        const insertingDiv = document.querySelector(`[insert]`);
        insertingDiv.appendChild(divSuccess);
        //Colocando token vindo do backend e redirecionando
        localStorage.setItem('piupiuwer-token', response.data.token);
        // window.location.href = '../feed';
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

    if (id === 'passwordA' || id === 'passwordB') {
        id = 'password'
    }

    divError.innerHTML = `Favor preencher: ${id}`
    divError.classList.add('error');
    insertingDiv.appendChild(divError);
}

function getConfig(methodType) {
    return {
        method: methodType,
        body: {
            email: form.email.value,
            name: form.name.value,
            //Eh preferivel que a senha seja criptografada
            password: form.passwordA.value,
        }
    }
}

function getErrorMessage(response) {
    const pError = document.createElement('p');
    pError.innerHTML = response.data.error;
    pError.classList.add('error');

    const verify = document.querySelector('.error');

    if (verify) {
        verify.remove();
    }

    return pError;
}

function passwordsCheck() {
    if (form.passwordA.value !== form.passwordB.value) {
        const divError = document.createElement('p');
        divError.innerHTML = 'As senhas precisam ser iguais';
        divError.classList.add('error');

        const verify = document.querySelector('.error');
        if (verify) {
            verify.remove();
        }

        const insertingDiv = document.querySelector('[insert]');
        insertingDiv.appendChild(divError);

        const passA = document.querySelector('#passwordA');
        const passB = document.querySelector('#passwordB');
        passA.classList.add('red-border');
        passB.classList.add('red-border');

        return false;
    } else {
        return true;
    }
}