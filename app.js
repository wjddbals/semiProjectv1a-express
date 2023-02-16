//express모듈과 기타 미들웨어 모듈 사용선언

const express=require('express');
const path =require('path');
const logger =require('morgan');

//라우팅모듈 설정
const indexRouter= require('./routes/index');
const memberRouter= require('./routes/member');
const boardRouter= require('./routes/board');

//express객테 생성 포트 변수 선언
const app =express();
const port =process.env.PORT || 3000;

//라유팅 없이 바로 호출 가능하도록static폴더 설정
app.use(express.static(path.join(__dirname,'static')));


//랴우팅 모듈 등록-클라이언트 요청 처리 핵심 파트
app.use('/',indexRouter);
app.use('/member',memberRouter);
app.use('/board',boardRouter);

//기타 라우팅 처리
app.use((req, res)=>{
    res.status(404);
    res.send ('404패이지노');
});
app.use((err,req,res,next)=>{
    res.status(500);
    res.send('500서버오류');
});

//위에서 설정한 내용을 토대로 express서버 실행
app.listen(port,()=>{
    console.log('semiProjectv1 서버 실행중');
});