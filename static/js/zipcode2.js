
//js\zipcode2.js
const makeopt = (elm, text) => {
    let opt = document.createElement('option');
    let txt = document.createTextNode(text);
    opt.appendChild(txt);
    elm.appendChild(opt);
};
const setSido =(sidos) =>{
 let objs =JSON.parse(sidos); //문자열을 객체로
    objs.forEach((obj,idx)=>{
        makeopt(sido,obj.sido);
    });
};
const setGugun =(guguns) =>{
    let objs =JSON.parse(guguns);
    //문자열을 객체로
    while (gugun.lastChild){
        gugun.removeChild(gugun.lastChild);
    }
    makeopt(gugun,'--시군구--')
    objs.forEach((obj,idx)=>{
        makeopt(sido,obj.sido);
    });
};

const getSido =() =>{ //서버에 시도 데이터 요청
fetch('/zipcode2/sido')
    .then(response =>response.text())
    .then(text =>setSido(text));
};


const getGugun =() =>{
    fetch('/zipcode2/gugun/'+sido.value)
        .then(response =>response.text())
        .then(text =>setGugun(text));
};
const getDong =() =>{

};
const getZipcode=() =>{};

let sido =document.querySelector('#sido');
let gugun =document.querySelector('#gugun');
let dong =document.querySelector('#dong');

sido.addEventListener('change',getGugun);
gugun.addEventListener('change',getDong);
dong.addEventListener('change',getZipcode);
getSido();
