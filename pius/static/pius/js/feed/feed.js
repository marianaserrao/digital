//elementos HTML
    var botaopiar = document.querySelector("#botaopiar");
    var botaopesquisar = document.querySelector("#botaopesquisa");
    var campofiltro = document.querySelector("#pesquisar");
    var botaomenu = document.querySelector("#botaomenu");
    var main = document.querySelector("main");

//funcao pius externos
window.onload= function(){

    //chamando elementos html
    var feed = document.querySelector("#feed");

    //chamando pius externos
    var xhr = new this.XMLHttpRequest();
    xhr.open("GET", "https://next.json-generator.com/api/json/get/EkyZfHLU_")

    //funcao exibir pius
    xhr.addEventListener("load",function(){

        //transformando JSON em objeto
        var resposta = xhr.responseText;
        var pius = JSON.parse(resposta);
        
        //percorrendo pius
        pius.forEach(function(piu){

            //criando elementos
            var div = document.createElement("div");
            var usuario = document.createElement('div');
            var imagem = document.createElement('div');
            var nomes = document.createElement('div');
            var user=document.createElement('h2')
            var nome= document.createElement('h3');
            var p = document.createElement("p");
            var interacao = document.createElement("div");
            var curtidas= document.createElement("p");
            var curtir=document.createElement("button");
            var del =document.createElement("button");

            //preenchendo elementos
            var img=piu.imagem
            if(img!=0){
                imagem.style.backgroundImage= "url('"+img+"')";
            }
            nome.textContent=piu.nome;
            user.textContent=piu.username;
            p.textContent=piu.mensagem;
            curtidas.textContent="0";
            curtir.textContent="Curtir";
            del.textContent=" Deletar";

            //envelopando elementos
            interacao.appendChild(curtidas);
            interacao.appendChild(curtir);
            interacao.appendChild(del);
            nomes.appendChild(nome);
            nomes.appendChild(user);
            usuario.appendChild(imagem);
            usuario.appendChild(nomes);
            div.appendChild(usuario);
            div.appendChild(p);
            div.appendChild(interacao);
            feed.prepend(div);
                
            //classificando elementos
            div.classList.add("divfeed");
            usuario.classList.add("divusuario");
            nome.classList.add("nome");
            user.classList.add("user")
            imagem.classList.add('imagem');
            p.classList.add("piu");
            interacao.classList.add("interacao");
            curtidas.classList.add("curtidas");
            curtir.classList.add("curtir");
            del.classList.add("del");

            //definindo variaveis de controle (funcao curtir)
            var i = 0;
            var curtido=0;
            
            //funcao curtir
            curtir.addEventListener("click",function(){
                event.preventDefault();
                
                //ainda nao foi curtido
                if(curtido%2==0){
                    
                    //atualizando variaveis de controle
                    i+=1;

                    //incrementando curtida
                    curtidas.textContent=i;

                    //alterando cor curtidas
                    curtir.classList.add("cinza");
                    curtidas.classList.add("cinza");
                }

                //ja foi curtido
                if(curtido%2!=0){

                    //atualizando variavel de controle
                     i-=1

                    //removendo curtida
                    curtidas.textContent=i;

                    //alterando cor curtidas
                    curtir.classList.remove("cinza");
                    curtidas.classList.remove("cinza");
                }

                //atualizando variavel de controle
                curtido+=1
            })
                
            //funcao deletar
            del.addEventListener("click",function(){
                event.preventDefault();
                div.remove();                    
            })    
            
        })
    });

    xhr.send();
}

//definindo variavel de controle (funcoes abrir e fechar menu)
var menu=false;
var menuclick=0;

//funcao menu
botaomenu.addEventListener('click',function(){
event.preventDefault;

    //chamando elementos html
    var divmenu = document.querySelector("#divmenu");

    //abrindo menu
    if(menu==false&&menuclick%2==0){

        //criando elementos
        var opcoes= document.createElement('div');
        var perfil= document.createElement("button");
        var novasenha = document.createElement("button")
        var sair= document.createElement('button');

        //preenchendo elementos
        perfil.textContent="Perfil";
        novasenha.textContent="Redefinir Senha";
        sair.textContent="Sair";
        
        //classificando elementos
        opcoes.classList.add('divopcoes');
        perfil.classList.add("botaoperfil");
        novasenha.classList.add("botaosenha");
        sair.classList.add("botaosair");
        
        //envelopando elementos
        opcoes.appendChild(perfil);
        opcoes.appendChild(novasenha);
        opcoes.appendChild(sair);
        divmenu.appendChild(opcoes);
        
        //funcao botao perfil
        perfil.addEventListener("click",function(){
            window.location='index-perfil.html';
        })
        
        //funcao botao redefinir senha
        novasenha.addEventListener("click",function(){
            window.location='index-senha.html';
        })

        //funcao botao sair
        sair.addEventListener("click",function(){
            window.location='index-login.html';
        })
    
        //atualizando variavel de controle
        menu=true;
    }

    //fechando menu
    if (menuclick%2!=0){
        var opcoes=document.querySelector(".divopcoes");
        opcoes.remove();
            
        //atualizando variavel
        menu=false;
    }

    //atualizando variavel
    menuclick+=1;
})

//funcao fechar menu
main.addEventListener("click",function(){

    //fechando menu
    if (menu==true){
        var opcoes=document.querySelector(".divopcoes");
        opcoes.remove();
        
        //atualizando variavel
        menu=false;
    }

    //atualizando variavel
    menuclick+=1;    
})

//funcao filtrar (digitando)
campofiltro.addEventListener("input",function(){

    //chamando elementos html
    var erropesquisa = document.querySelector("#erropesq");
    var pius=document.querySelectorAll('.piu');
    var nomes=document.querySelectorAll(".nome");
    var users=document.querySelectorAll(".user");
    var divsfeed=document.querySelectorAll(".divfeed");

    //limpando erro
    erropesquisa.innerHTML='';
    
    //percorrendo pius
    for(i=0; i<pius.length; i++){

        //definindo variaveis
        piu=pius[i].textContent;
        nome=nomes[i].textContent;
        user=users[i].textContent;
        divfeed=divsfeed[i];

        //definindo pesquisa por parte correspondente lower ou uppercase
        var expressao = new RegExp(this.value, "i");

        //escondendo pius nao correspondentes
        if (!expressao.test(piu)&&!expressao.test(nome)&&!expressao.test(user)){
            divfeed.style.display="none"; 
        }

        //mostrando pius correspondentes
        if(expressao.test(piu)||expressao.test(nome)||expressao.test(user)){
            divfeed.style.display="inherit";
        }
    }

})

//funcao pesquisar (clicando)
botaopesquisar.addEventListener("click",function(){
    event.preventDefault();

    //chamando elementos html
    var erropesquisa = document.querySelector("#erropesq");
    var formpesquisa = document.querySelector("#formpesquisa");
    var formpublicacao = document.querySelector("#publicar");
    var pius=document.querySelectorAll('.piu');
    var nomes=document.querySelectorAll(".nome");
    var users=document.querySelectorAll(".user");
    var divsfeed=document.querySelectorAll(".divfeed");
    
    //definindo variavel de controle (pesquisa de pius)
    var encontrado = false

    //definindo variaveis
    var input=formpesquisa.pesquisar.value;
    var piu=formpublicacao.novopiu.value;
    
    //limpando erro
    erropesquisa.innerHTML='';

    //erro por pesquisa nula
    if (input==0){
        erropesquisa.textContent= "Pesquisa Inválida!";
        invalida =true
    }

    //pesquisa nao nula
    if(input!=0){
        
        //percorrendo pius        
        for(i=0; i<pius.length; i++){

            //definindo variaveis
            piu=pius[i].textContent;
            nome=nomes[i].textContent;
            user=users[i].textContent;
            divfeed=divsfeed[i];

            //definindo pesquisa por parte correspondente lower ou uppercase
            var expressao = new RegExp(campofiltro.value, "i");
            
            //piu encontrado
            if (expressao.test(piu)||expressao.test(nome)||expressao.test(user)){

                //atalizando variavel de controle
                encontrado=true
            }
        }

        //mensagem piu nao
        if(encontrado==false){
            erropesquisa.textContent= "Nenhum resultado encontrado";
        }
    }
})    

//funcao contador caracteres
function caracteres(contar,mostrar) {

    //chamando elementos html
    var caracteres = document.getElementById(contar).value.length;

    //mostrando contagem em contador
    document.getElementById(mostrar).innerHTML = caracteres;

    //erro contagem excedente
    if (caracteres>140){
        document.getElementById("contagem").style.color = "red";
        document.getElementById("contagem").style.fontWeight = "700";
    }

    //contagem permitida
    if (caracteres<=140){
        document.getElementById("contagem").style.color = "black";
        document.getElementById("contagem").style.fontWeight = "500";
    }
}

//funcao piar
botaopiar.addEventListener("click",function(){
    event.preventDefault();

    //chamando elementos html
    var erropublicacao = document.querySelector("#erropubli");
    var formpublicacao = document.querySelector("#publicar");
    var feed = document.querySelector("#feed");
    
    //limpando erros
    erropublicacao.innerHTML='';
    
    //definindo variaveis
    var invalido=false;
    var piu=formpublicacao.novopiu.value;
    
    //erro piu nulo
    if (piu==0){
        erropublicacao.textContent="Piu Inválido!";
        invalido=true;
    }
    
    //erro piu excedente
    if(piu.length>140){
        erropublicacao.textContent="O número máximo de caracteres por piu é 140!";
        invalido=true;
    }
    
    //criando novo piu
    if(invalido==false){

        //criando elementos
        var div = document.createElement("div");
        var usuario = document.createElement('div');
        var imagem = document.createElement('div');
        var nomes = document.createElement('div');
        var user=document.createElement('h2')
        var nome= document.createElement('h3');
        var p = document.createElement("p");
        var interacao = document.createElement("div");
        var curtidas= document.createElement("p");
        var curtir=document.createElement("button");
        var del =document.createElement("button");
        
        //preenchendo elementos
        imagem.backgroundImage="url(+img/usuario.png+)"
        nome.textContent="Mariana Serrão";
        user.textContent="@MariS"
        p.textContent=piu;
        curtidas.textContent="0";
        curtir.textContent="Curtir";
        del.textContent=" Deletar";
        
        //envelopando elementos
        interacao.appendChild(curtidas);
        interacao.appendChild(curtir);
        interacao.appendChild(del);
        nomes.appendChild(nome);
        nomes.appendChild(user);
        usuario.appendChild(imagem);
        usuario.appendChild(nomes);
        div.appendChild(usuario);
        div.appendChild(p);
        div.appendChild(interacao);
        feed.prepend(div);
        
        //classificando elementos
        div.classList.add("divfeed");
        usuario.classList.add("divusuario");
        nome.classList.add("nome");
        user.classList.add("user")
        imagem.classList.add('imagem');
        p.classList.add("piu");
        interacao.classList.add("interacao");
        curtidas.classList.add("curtidas");
        curtir.classList.add("curtir");
        del.classList.add("del");

        //limpando barra de digitacao
        formpublicacao.reset();
    }
    
     //definindo variaveis de controle (funcao curtir)
     var i = 0;
     var curtido=0;
     
     //funcao curtir
     curtir.addEventListener("click",function(){
         event.preventDefault();
         
         //ainda nao foi curtido
         if(curtido%2==0){
             
             //atualizando variaveis de controle
             i+=1;

             //incrementando curtida
             curtidas.textContent=i;

             //alterando cor curtidas
             curtir.classList.add("cinza");
             curtidas.classList.add("cinza");
         }

         //ja foi curtido
         if(curtido%2!=0){

             //atualizando variavel de controle
              i-=1

             //removendo curtida
             curtidas.textContent=i;

             //alterando cor curtidas
             curtir.classList.remove("cinza");
             curtidas.classList.remove("cinza");
         }

         //atualizando variavel de controle
         curtido+=1
     })
    
    //funcao deletar
    del.addEventListener("click",function(){
        event.preventDefault();
        div.remove();
    })       
})










