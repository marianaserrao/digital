function createPiu({ mensagem, nome, imagem, username, time, likes, myPiu }) {
    const returnedDiv = createPiu({ nome, username, imagem, myPiu, mensagem, likes, time });

    return returnedDiv;
}

function createPiu(user) {
    const returnedDiv = document.createElement('div');
    returnedDiv.classList.add('piu');

    const header = document.createElement('header');
    header.classList.add('piuHeader');

    const userInfo = document.createElement('div');
    userInfo.classList.add('userInfo');

    const userImgInPiu = document.createElement('div');
    userImgInPiu.classList.add('userImgInPiu');
    if (!user.imagem) {
        user.imagem = '../../assets/user-default.png'
    }

    userImgInPiu.style.backgroundImage = `url("${user.imagem}")`
    userImgInPiu.style.backgroundPosition = 'center';
    userImgInPiu.style.backgroundSize = 'cover';

    const userInfoText = document.createElement('div');
    userInfoText.classList.add('userInfoText');

    const userInfoName = document.createElement('div');
    userInfoName.classList.add('userInfoName');
    userInfoName.innerHTML = user.nome;

    const userInfoUserName = document.createElement('div');
    userInfoUserName.classList.add('userInfoUserName');
    userInfoUserName.innerHTML = user.username;

    userInfoText.appendChild(userInfoName);
    userInfoText.appendChild(userInfoUserName);

    userInfo.appendChild(userImgInPiu);
    userInfo.appendChild(userInfoText);

    header.appendChild(userInfo);

    const piuInfo = document.createElement('div');
    piuInfo.classList.add('piuInfo');

    const moreInfoPiu = document.createElement('button');
    moreInfoPiu.classList.add('moreInfoPiu');

    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.classList.add('infoDiv');
    moreInfoDiv.style.display = 'none'
    moreInfoDiv.setAttribute('open', 'false');

    moreInfoPiu.addEventListener("click", () => {
        if (moreInfoDiv.getAttribute('open') === 'true') {
            moreInfoDiv.style.display = 'none';
            moreInfoDiv.setAttribute('open', 'false');
        } else if (moreInfoDiv.getAttribute('open') === 'false') {
            moreInfoDiv.removeAttribute('style');
            moreInfoDiv.setAttribute('open', 'true');
        }
    })

    const dots = document.createElement('img');
    dots.src = '../../assets/Icons/3dots.svg';

    moreInfoPiu.appendChild(dots);
    piuInfo.appendChild(moreInfoPiu);



    const piuContent = document.createElement('div');
    piuContent.classList.add('piuContent');

    const piuText = document.createElement('div');
    piuText.classList.add('piuText');
    piuText.innerHTML = user.mensagem;

    const likeDiv = document.createElement('div');
    likeDiv.classList.add('likeDiv');

    const piuHourInfo = document.createElement('div');
    piuHourInfo.classList.add('piuHourInfo');
    if (user.myPiu) {
        user.time = 0;
    } else {
        user.time = Math.floor(Math.random() * 10);
    }

    piuHourInfo.innerHTML = `Postado há ${user.time} dias`;

    const piuLikes = document.createElement('button');
    piuLikes.classList.add('piuLikes');
    piuLikes.setAttribute('liked', 'false');

    const likeText = document.createElement('p');
    likeText.classList.add('likeText');
    if (user.myPiu) {
        user.likes = 0;
    } else {
        user.likes = Math.floor(Math.random() * 100);
    }

    likeText.innerHTML = user.likes;

    piuLikes.addEventListener("click", (e) => {
        const isLiked = piuLikes.getAttribute('liked');

        if (isLiked === 'true') {
            const likes = likeText.innerHTML;

            piuLikes.setAttribute('liked', 'false');
            piuLikes.classList.remove('liked');
            likeText.innerHTML = Number(likes) - 1
        } else {
            const likes = likeText.innerHTML;

            piuLikes.setAttribute('liked', 'true');
            piuLikes.classList.add('liked');
            likeText.innerHTML = Number(likes) + 1;
        }

    })

    const likeIcon = document.createElement('img');
    likeIcon.classList.add('likeIcon');
    likeIcon.src = '../../assets/Icons/like.svg';

    piuLikes.appendChild(likeText);
    piuLikes.appendChild(likeIcon);

    likeDiv.appendChild(piuHourInfo);
    likeDiv.appendChild(piuLikes);

    piuContent.appendChild(piuText);
    piuContent.appendChild(likeDiv);

    if (user.myPiu) {
        const edit = document.createElement('div');
        edit.addEventListener("click", () => {
            moreInfoDiv.style.display = 'none';
            moreInfoDiv.setAttribute('open', 'false');

            const newInput = document.createElement('div');
            newInput.classList.add('piuText');

            const input = document.createElement('input');
            input.classList.add('editInput');

            input.value = document.querySelector('.piuText').innerHTML;

            const sendButton = document.createElement('button');
            sendButton.classList.add('editButton');
            sendButton.innerHTML = 'Enviar';

            sendButton.addEventListener("click", () => {
                if (input.value.length > 140 || input.value.length === 0) {
                    return;
                }

                const piuText = document.createElement('div');
                piuText.classList.add('piuText');

                piuText.innerHTML = input.value;

                document.querySelector('.piuText').remove();
                piuContent.insertBefore(piuText, piuContent.firstChild);
            });

            input.addEventListener("input", (e) => {
                const length = e.target.value.length;

                if (length > 140) {
                    textArea.style.border = 'solid 2px rgb(255, 72, 72)';

                    sendButton.style.opacity = '0.3';
                    sendButton.style.cursor = 'not-allowed';
                } else {
                    textArea.style.removeProperty('border');
                    sendButton.style.cursor = 'pointer';
                    sendButton.style.opacity = '1';
                }
            })

            newInput.appendChild(input);
            newInput.appendChild(sendButton);

            document.querySelector('.piuText').remove();
            piuContent.insertBefore(newInput, piuContent.firstChild);
            newInput.classList.add('whiteBorder');
        })

        const del = document.createElement('div');

        del.addEventListener("click", (e) => {
            e.target.parentNode.parentNode.parentNode.remove()
        })

        edit.innerHTML = 'Editar'
        edit.classList.add('editRow');
        del.innerHTML = 'Deletar'
        del.classList.add('delRow');

        moreInfoDiv.appendChild(edit);
        moreInfoDiv.appendChild(del);
    } else {
        const denounce = document.createElement('div');
        denounce.innerHTML = 'Denunciar';
        denounce.classList.add('delRow');

        denounce.addEventListener("click", (e) => {
            const piu = e.target.parentNode.parentNode.parentNode;
            const denounce = e.target.parentNode.parentNode.childNodes[1].childNodes[0];

            if (piu.classList.contains('lowOpacity')) {
                piu.classList.remove('lowOpacity');
                denounce.innerHTML = 'Denunciar';
            } else {
                piu.classList.add('lowOpacity');
                denounce.innerHTML = 'Retirar Denuncia';
            }


            moreInfoDiv.style.display = 'none';
            moreInfoDiv.setAttribute('open', 'false');
        })

        moreInfoDiv.appendChild(denounce);
    }

    header.appendChild(moreInfoDiv);

    header.appendChild(piuInfo);
    returnedDiv.appendChild(header);
    returnedDiv.appendChild(piuContent);

    return returnedDiv;
}
