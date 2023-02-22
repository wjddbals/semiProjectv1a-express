const express= require('express');
const router =express.Router();
const Zipcode= require('../models/Zipcode');
router.get('/', async (req,res)=>{

    let  sido =req.query.sido;
    let gugun =req.query.gugun;
    let [guguns,dongs,zips] =[null,null,null]
    let dong =req.query.dong;

    let sidos =new Zipcode().getSido().then(sido=>sido);
   // console.log(await sidos);

    if (sido !==undefined)
   guguns =new Zipcode().getGugun(sido).then(gugun => gugun);
   //console.log(await guguns);

    if (sido !==undefined &&gugun !==undefined)
    dongs =new Zipcode().getDong(sido,gugun).then(dong=>dong);
    //console.log(await dongs);


    if (sido !==undefined &&gugun !==undefined && dong !==undefined) //우편번호 검색
        zips =new Zipcode().getDong(sido,gugun,dong).then(zip=>zip);
    //console.log(await dongs);

    res.render('zipcode',{title:'시군구동 찾기',
    sidos: await sidos,guguns: await guguns,dongs: await dongs,
    sido:sido,gugun: gugun,dong:dong,zips:await zips});
});

module.exports =router;