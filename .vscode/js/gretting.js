//querySelector는 첫번째로 찾은 것
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting= document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";
//로컬 스토리지 : 컴퓨터에 정보 저장하는 방법 

//이름을 로컬스토리지에 기억하는 함수
function saveName(text){
    localStorage.setItem(USER_LS,text);
}

//제출하는 이벤트를 처리하는 함수
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

//이름이 없는 경우 form태그를 다시 출력
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

//이름을 받아오면 form태그에 .showing을 제거 함과 동시에 greeting엔 .showing 추가하면서
//  `Hello ${text}` 까지
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

//로컬스토리지에 저장된 값을 가져온다.
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    console.log(currentUser);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}


function init(){
    loadName();
}

init();