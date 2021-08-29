const body = document.querySelector("body");

const IMG_NUMBER = 3;

//image를 생성후 src값을 랜덤으로 받아온 숫자를 이용해 넣어준다.
//body.appendChild(image)를 통해 이미지태그를 추가후 
//image.classList.add("bgImage")를 이용해 img태그에 class이름을 bgImage로 부여한다.


function paintImage(imgNumber){
    const image = new Image();
    image.src = `../images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER); 
    return number;
}

function init(){
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();