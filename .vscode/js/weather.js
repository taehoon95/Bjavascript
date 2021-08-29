const weahter = document.querySelector(".js-weather");
const API_KEY = '6d55a9b230de3aa04e449281fe1a7393';
const COORDS = 'coords';

function getWeather(lat, lon){
    //데이터를 가져올때는 fetch()안에는 가져올 데이터를 넣으면된다.
    //섭씨온도를 사용하기 위해 units=metric를 맨 뒤쪽에 붙임
    //then()의 역할 :데이터가 완전히 들어온 다음 호출
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){// response값만 받아온다.
            return response.json();
        }).then(function(json){//then()을 사용해 response값까지 받아오길 기다린후 json값 찾는다.
            const temperature = json.main.temp;
            const place = json.name;
            console.log(temperature)
            console.log(place);
            weahter.innerText=`${place} ${temperature}`;
        })
}

//api를 이용해 데이터 쓰기
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));    
}

function handleGeoSucces(position){
    //위도(latitude), 경도(longitude)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // const coordsObj = {
    //     latitude : latitude,
    //     longitude : longitude
    // } 
    //이렇게 객체에 변수의 이름과 키값과 같게 저장할경우 생략가능
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

//좌표를 요청하는 함수
//navigation api를 사용해서 위치정보를 읽어옴
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

//좌표 로드
function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    } else{
        //getWeather
        
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();