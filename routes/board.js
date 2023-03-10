//board.js
const express = require('express');
//const path = require('path');
const router = express.Router();
const Board = require('../models/Board')
const ppg = 15; //페이지당 게시물 수

//페이징 기능 지원
// 현재 페이지를 의미하는 변수 ;cpg
//현재 페이지에 해당하는 게시물등을 조회하려면 해당범위의 시작값고 종료
// cpg : 1   => 1 ~ 5
// cpg : 2   => 6 ~ 10
// cpg : 3   => 11 ~ 15
//페이지당 게시물 수 ppg;5(
// ppage : 5
// stnum : (cpg - 1) * ppg + 1
// ednum : stnum + ppg

router.get('/list',async (req, res) => {
    let [cpg,ftype,fkey] = [req.query.cpg,req.query.ftype,req.query.fkey];
    console.log (fkey,ftype);

    cpg =cpg ? parseInt(cpg) : 1;
    let stnum =(cpg - 1) * ppg + 1; //지정한 페이지의 범위 시작 값

    let result = new Board().select(stnum,ftype,fkey).then((result) => result);
    let bds = result.then(r=>r.bds);
    let allcnt =result.then(r=>r.allcnt);

    let alpg =Math.ceil(await allcnt/ppg); //총페이지수 게산


    //페이지네이션 블럭 생성
    //1 페이지의 페이지네이션 : 1 2 3 4 5 6 7 8 9 10
    // 2 페이지의 페이지네이션 : 1 2 3 4 5 6 7 8 9 10
    // ...
    // 10 페이지의 페이지네이션 : 1 2 3 4 5 6 7 8 9 10
    //
    // 11 페이지의 페이지네이션 : 11 12 13 14 15 16 17 18 19 20
    // ...
    // 15 페이지의 페이지네이션 : 11 12 13 14 15 16 17 18 19 20
    // ...
    // 21 페이지의 페이지네이션 : 21 22 23 24 25 26 27 28 29 30
    //
    let stpgn =parseInt((cpg - 1) / 10) * 10 + 1;  //페이지네이션 시작값 계산
    let stpgns =[];
    for (let i = stpgn; i < stpgn + 10; ++i){
        if(i <= alpg) { //i가 총페이지수보다 같거나 작을때 i 출력 stpgn은 시작하는 페이지
        let iscpg=(i == cpg) ? true :false; //현재페이지 표시
        let pgn ={'num':i, 'iscpg': iscpg };
        stpgns.push(pgn);
        }
    }


       let isprev = (cpg - 1 > 0); //이전 표시이다//이전버튼 표시여부
        let isnext = (cpg < alpg);  // 다음버튼 표시 여부alpg는 모든 페이지
        let isprev10 = (cpg - 10 > 0) ;
        let isnext10 =  (cpg + 10 < alpg);
        let pgn = {'prev':cpg - 1,'next':cpg + 1,//이전:현재페이지 -1 다음 : 현재페이지 +1
            'prev10': cpg - 10,'next10':cpg + 10,
            'isprev': isprev, 'isnext':isnext,
            'isprev10': isprev10, 'isnext10':isnext10};


    console.log(cpg,stnum,stpgn,alpg,isnext);
    let qry =fkey? `&ftype=${ftype}$fkey=${fkey}`:'';

    // handlebars 뷰 엔진으로 응답처리
    res.render('board/list', {title: '게시판 목록',
        bds: await bds, stpgns:stpgns, pgn:pgn,qry:qry});
});


router.get('/write',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'write.html'));
    if (!req.session.userid)
        res.redirect(303,'/member/login');
        else
    res.render('board/write', {title: '게시판 새글쓰기'});
});


router.post('/write',async (req,res)=>{
   let viewName = '/board/failWrite';
    let {title, uid, contents} = req.body;

    let rowcnt = new Board(null, title, uid,
        null, contents, null).insert().then((result)=>result);
    if (await rowcnt > 0) viewName = '/board/list';


    res.redirect(303, viewName);
});

router.get('/view',async (req,res)=>{
    let bno =req.query.bno;
    let bds=new Board().selectOne(bno).then((bds)=>bds);
    //res.sendFile(path.join(__dirname,'../public', 'view.html'));
    res.render('board/view', {title: '게시판 본문보기',bds: await bds});
});


router.get('/delete',async (req, res) => {
    let {bno,uid }= req.query;

    let suid =req.session.userid;

    if(suid && uid && (suid==uid)){
        new Board().delete(bno).then(cnt => cnt);
    }



    res.redirect(303,'/board/list');
});
router.get('/update',async (req, res) => {
    let {bno, uid} = req.query;
    let suid = req.session.userid;

    if (uid && suid && (uid == suid)) {
        let bds = new Board().selectOne(bno).then(bds => bds);
        res.render('board/update', {title: '게시판 수정하기', bds: await bds});
    } else {
        res.redirect(303, '/board/list');
    }
});

router.post('/update',(req,res)=>{
    let {title,uid,contents } =req.body;
    let bno =req.query.bno;
    let suid = req.session.userid;

    if (uid && suid && (uid == suid)) {
         new Board(bno,title,uid,0,contents,0)
            .update(bno).then(cnt=> cnt);
        res.redirect(303, '/board/list');
    } else {
        res.redirect(303, '/board/list');
    }
    
});

module.exports = router;