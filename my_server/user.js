//user.js
const express = require('express');
const db = require('./mssql.js');
const moment = require('moment');
const router = express.Router();
 
//let selectAll = async function (tableName, callBack) {
router.get('/select_all', function (req, res, next) {
    db.selectAll('所有藥材資料表', function (err, result) {//查询所有
        res.send(result.recordset)
    });
});
//select = async function (tableName, topNumber, whereSql, params, orderSql, callBack) {
router.get('/select_mono', function(req, res, next){
    db.select('所有藥材資料表', "", " where 是否單方 = @param",  { param: 1 }, '', function (err, result) {
        res.send(result.recordset)
        
    });
});

router.get('/select_double', function(req, res, next){
    db.select('所有藥材資料表', "", " where 是否複方 = @param",  { param: 1 }, '', function (err, result) {
        res.send(result.recordset)
    });
});
router.get('/select_med', function(req, res, next){
    db.select('所有藥材資料表', "", " where 是否藥材 = @param",  { param: 1 }, '', function (err, result) {
        res.send(result.recordset)
    });
});

router.get('/ref_link',function(req, res, next){
    db.selectAll('藥材資料來源', function (err, result) {//查询所有
        res.send(result.recordset)
    });
})


// router.post('/delete', function (req, res, next) {//删除一条id对应的userInfo表的数据
//     console.log(req.body, 77);
//     const { UserId } = req.body
//     const id = UserId
//     db.del("where id = @id", { id: id }, "userInfo", function (err, result) {
//         console.log(result, 66);
//         res.send('ok')
//     });
// });
// router.post('/update/:id', function (req, res, next) {//更新一条对应id的userInfo表的数据
//     var id = req.params.id;
//     var content = req.body.content;
//     db.update({ content: content }, { id: id }, "userInfo", function (err, result) {
//         res.redirect('back');
//     });
// });


 
module.exports = router;

