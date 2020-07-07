const searchBar = document.querySelector('.searchBar');
let hasClearEvent = false;

async function main() {
    const insertUsersFound = document.querySelector('.searchedUsers');
    const changeRadius = document.querySelector('.searchBox');
    const searchButton = document.querySelector('.searchButton');

    const response = await getUsers();
    searchBar.addEventListener("input", () => handleSearchBarClick(response, insertUsersFound, changeRadius, searchButton));
}

main();
// searchBar.addEventListener("focusout", handleFocusOut);
// searchBox.onclick(handleSearchBarClick)

async function handleSearchBarClick(response, insertUsersFound, changeRadius, searchButton) {
    //O correto seria fazer a requisicao ja com a string e o backend cuidar das filtragens
    setTimeout(() => {
        const matchUser = new RegExp(searchBar.value, "i");
        const usersMatched = getMatchedUsers(matchUser, response);

        if (searchBar.value.length > 0) {
            insertUsersFound.innerHTML = '';
            insertUsersDiv(usersMatched, insertUsersFound);
            insertUsersFound.style.padding = '10px'

            if (window.innerWidth < 790) {
                changeRadius.style.width = '100%';
            }

            searchButton.src = '../../assets/Icons/close.svg'
            searchButton.addEventListener("click", () => {
                searchBar.value = '';

                insertUsersFound.style.padding = '0px'
                insertUsersFound.innerHTML = '';

                if (window.innerWidth < 790) {
                    changeRadius.style.removeProperty('width');
                }

                searchButton.src = '../../assets/Icons/searchIcon.svg'
                changeRadius.style.borderBottomLeftRadius = '45px';
                changeRadius.style.borderBottomRightRadius = '45px';
            })

            changeRadius.style.borderBottomLeftRadius = '0px';
            changeRadius.style.borderBottomRightRadius = '0px';
        } else {
            insertUsersFound.style.padding = '0px'
            insertUsersFound.innerHTML = '';

            if (window.innerWidth < 790) {
                changeRadius.style.removeProperty('width');
            }

            searchButton.src = '../../assets/Icons/searchIcon.svg'
            changeRadius.style.borderBottomLeftRadius = '45px';
            changeRadius.style.borderBottomRightRadius = '45px';
        }
    }, 500);
}

// function handleFocusOut() {
//     const changeRadius = document.querySelector('.searchBox');
//     const insertUsersFound = document.querySelector('.searchedUsers');

//     changeRadius.style.borderBottomLeftRadius = '45px';
//     changeRadius.style.borderBottomRightRadius = '45px';
//     insertUsersFound.innerHTML = ''
// }

async function getUsers() {
    const responseRaw = await fetch(apiURL);
    const response = await responseRaw.json();

    return response;
}

function getMatchedUsers(exp, response) {
    if (!exp) {
        return;
    }

    const usersMatched = [];

    for (let i = 0; i < response.length; i++) {
        if (exp.test(response[i].username)) {
            usersMatched.push(response[i]);
        }
    }

    return usersMatched;
}

function insertUsersDiv(users, insertDiv) {
    for (let i = 0; i < users.length; i++) {
        const user = document.createElement('div');
        user.classList.add('userBoxSearch');

        const userImg = document.createElement('div');
        userImg.classList.add('imgBoxSearch');

        if (!users[i].imagem) {
            users[i].imagem = '../../assets/user-default.png';
        }

        userImg.style.backgroundImage = `url(${users[i].imagem})`;
        userImg.style.backgroundPosition = 'center';
        userImg.style.backgroundSize = 'cover';

        const userText = document.createElement('p');
        userText.classList.add('userTextSearch');
        userText.innerHTML = users[i].username;

        user.appendChild(userImg);
        user.appendChild(userText);

        insertDiv.appendChild(user);
    }

    const loadImage = document.createElement('div');
    loadImage.innerHTML = 'Sem mais usuarios...'
    loadImage.classList.add('loading');
    loadImage.classList.add('vinXvin');
    loadImage.classList.add('loadingInSearch');

    insertDiv.appendChild(loadImage);

    return;
}

