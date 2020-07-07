const insertArea = document.querySelector('.piuArea');

const userOjb = {
    user: {
        name: 'Exemplo',
        username: '@exemplo'
    },

    text: 'Exemplo',
    time: '17 horas',
    likes: 44
}

//API request
async function getPius() {
    //apiURL esta em services/api.js
    const rawResponse = await fetch(apiURL);
    const response = await rawResponse.json();

    document.querySelector('.loading').remove();

    response.forEach(piuObj => {
        insertArea.appendChild(createPiu(piuObj));
    });
}

//Esperar elementos da DOM renderizarem corretamente
const time = setTimeout(() => {
    getPius();
}, 250);