//elementos HTML
    var searchButton = document.querySelector(".searchButton");
    var searchBar = document.querySelector(".searchBar");
    var followButtons= document.querySelectorAll('.followButton')

//funcao filtrar (digitando)
searchBar.addEventListener("input",function(){

    //chamando elementos html
    var nomes=document.querySelectorAll(".userInfoName");
    var users=document.querySelectorAll(".userInfoUserName");
    var divusers=document.querySelectorAll(".users");
    
    //percorrendo pius
    for(i=0; i<divusers.length; i++){

        console.log('oi');

        //definindo variaveis
        nome=nomes[i].textContent;
        user=users[i].textContent;
        divuser=divusers[i];

        //definindo pesquisa por parte correspondente lower ou uppercase
        var expressao = new RegExp(this.value, "i");

        //escondendo pius nao correspondentes
        if (!expressao.test(nome)&&!expressao.test(user)){
            divuser.style.display="none"; 
        }

        //mostrando pius correspondentes
        if(expressao.test(nome)||expressao.test(user)){
            divuser.style.display="inherit";
        }
    }

})












