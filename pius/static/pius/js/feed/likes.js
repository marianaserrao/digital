const LikeButtons = document.querySelectorAll('#likeButton');
const DeslikeButtons = document.querySelectorAll('#deslikeButton');
const Pius = document.querySelectorAll('.piu');
const LikesNumbers = document.querySelectorAll('#likesNumber');
const DeslikeNumbers = document.querySelectorAll('#deslikeNumber');

for(i=0; i<Pius.length; i++){

    likeButton=LikeButtons[i];
    deslikeButton=DeslikeButtons[i];

    likeButton.addEventListener("click",function(){
        event.preventDefault();

        var button=event.target;

        for(k=0; k<LikeButtons.length; k++){

            like=LikeButtons[k]
            deslike=DeslikeButtons[k]
            likesNumber=LikesNumbers[k]

            if (like==button){

                deslike.style.display= 'inherit';
                like.style.display= 'none';
            }
        }
    })
    
    deslikeButton.addEventListener("click", function(){

        var button=event.target;

        for(k=0; k<DeslikeButtons.length; k++){

            like=LikeButtons[k]
            deslike=DeslikeButtons[k]

            if (deslike==button){

                deslike.style.display= 'none';
                like.style.display= 'inherit';
            }
        }
    })
}