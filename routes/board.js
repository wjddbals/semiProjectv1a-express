const path= require('path');
const express= require('express');
const router = express.Router();

router.get('/write',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public' , 'write.html'));
});


router.get('/view',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public' , 'iview.html'));
});

router.get('/list',(req, res)=>{
    res.sendFile(path.join(__dirname,'../public' , 'list.html'));
});




module.exports=router;