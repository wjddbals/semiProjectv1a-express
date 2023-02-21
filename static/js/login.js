//write.js
const processlogin = () => {
    let frm = document.login;
    if (frm.uid.value ==='') alert('아이디는?');
    else if (frm.pwd.value ==='') alert('비빌번호는?');
    else {
        frm.method = 'post';
        frm.submit();
    }
};
let writebtn = document.querySelector('#loginbtn');
loginbtn.addEventListener('click', processlogin);
