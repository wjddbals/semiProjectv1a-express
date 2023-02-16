const express = require('express');
const path = require('path');
const logger = require('morgan');  // 로그 출력기

// 라우터 외부 작성
const indexRouter = require('./routes/index');
const memberRouter = require('./routes/member');
const boardRouter = require('./routes/board');

const app = express();
const port = process.env.PORT || 3000;
const html = 'text/html; charset=utf-8';

// 라우팅을 거치치 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname, 'static')));

//로그 설정
app.use(logger('dev'));

// index에 대한 route handler 지정
app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/board', boardRouter);

// 404 처리
// app.use((req,res) =>{
//     res.status(404);
//     res.sendFile(path.join(__dirname,'public', '404.html'));
// });

// 500처리
// app.use((err,req,res,next) =>{
//     res.status(500);
//     res.sendFile(path.join(__dirname,'public', '500.html'));
// });


app.listen(port,() =>{
    console.log('express 서버가 실행중... 중지하혀면 ctrl+c를 눌러주세요!');
});