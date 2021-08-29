const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


//toDo를 삭제를 하기 위한 과정
//console.log(event)로 확인해 보니 버튼 식별 불가
//console.log(event.target)으로 각버튼을 확인 그러나 구분되는 값을 받지못함
//console.dir(event.target)으로 event.target의 정보를 확인후 parentNode값을 찾음
//부모를 이용해 삭제 하기 위해 delete child element mdn을 구글링후
//부모.removeChild(li)를 찾아냄
//filter()를 이용해 함수 하나 실행
//filter는 마치 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행되게 만들려고한다.
//우선 array를 하나 만든다.
//그후 filter는 체크된 값을 받아서 array에 true,false로 이루어지게 배열을 구성

function deleteToDO(event){
    const btn =  event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    //여기까지 const toDos였지만 
    //toDos = cleanToDos로 바꾸기 위해 
    //let toDos로 변경
    toDos = cleanToDos;

    //그후 저장함으로 써 마무리한다.
    saveToDos();
}

//로컬스토리지는 모든 데이터를 String으로 저장하려고 하기 때문에 객체를 저장할 때 object로 표시된다.
//그렇기 때문에 JSON.stringify(toDos)를 사용해서 String으로 바꾼다.
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDO(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDO);
    span.innerText = text;
    toDoList.appendChild(li);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDO(currentValue);

    //제출후 다시 ""값으로 만들어 준다.
    toDoInput.value = "";
}

//loadedToDos는 String이기 때문에 JSON.parse(loadedToDos)를 사용해 Object로 바꾸어 데이터를 사용한다.

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parseToDos = JSON.parse(loadedToDos);
        //forEach를 이용해 array에 있는 것들을 한번씩 수행 할 수 있도록 한다.
        parseToDos.forEach(function(toDo) {
            //parseToDos안에 있던 array 길이만큼 text를 하나씩 paintToDo에 넣어준다.
            paintToDO(toDo.text);
        })
    }
}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();