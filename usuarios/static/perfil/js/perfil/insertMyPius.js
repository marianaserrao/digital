const insertPius = document.querySelector('.insertPius');

const obj1 = {
    mensagem: 'Testando meus pius',
    nome: 'Jorge Habib El Khouri',
    username: '@_jorgehabib',
    myPiu: true,
}

const obj2 = {
    mensagem: 'Testando meus pius',
    nome: 'Jorge Habib El Khouri',
    username: '@_jorgehabib',
    myPiu: true,
}

const obj3 = {
    mensagem: 'Oiii galera',
    nome: 'Jorge Habib El Khouri',
    username: '@_jorgehabib',
    myPiu: true,
}

const obj4 = {
    mensagem: 'Uhuuul',
    nome: 'Jorge Habib El Khouri',
    username: '@_jorgehabib',
    myPiu: true,
}

const myPius = [];

myPius.push(createPiu(obj1));
myPius.push(createPiu(obj2));
myPius.push(createPiu(obj3));
myPius.push(createPiu(obj4));

myPius.forEach(piu => insertPius.appendChild(piu));