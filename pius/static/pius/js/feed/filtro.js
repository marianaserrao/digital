//elementos HTML
    var searchButton = document.querySelector(".searchButton");
    var searchBar = document.querySelector(".searchBar");
    var piuLikes= document.querySelectorAll('.piuLikes')
    var likeButtons= document.querySelectorAll('#likeButon')

//funcao filtrar (digitando)
searchBar.addEventListener("input",function(){

    //chamando elementos html
    var pius=document.querySelectorAll('.piuText');
    var nomes=document.querySelectorAll(".userInfoName");
    var users=document.querySelectorAll(".userInfoUserName");
    var divpius=document.querySelectorAll(".piu");
    
    //percorrendo pius
    for(i=0; i<divpius.length; i++){

        //definindo variaveis
        piu=pius[i].textContent;
        nome=nomes[i].textContent;
        user=users[i].textContent;
        divpiu=divpius[i];

        //definindo pesquisa por parte correspondente lower ou uppercase
        var expressao = new RegExp(this.value, "i");

        //escondendo pius nao correspondentes
        if (!expressao.test(piu)&&!expressao.test(nome)&&!expressao.test(user)){
            divpiu.style.display="none"; 
        }

        //mostrando pius correspondentes
        if(expressao.test(piu)||expressao.test(nome)||expressao.test(user)){
            divpiu.style.display="inherit";
        }
    }

})












