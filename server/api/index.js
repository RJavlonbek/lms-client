var express=require('express');
var router=express.Router();

var requestAPI=require('./request.js');
var userAPI=require('./user.js');
var categoryAPI=require('./category.js');
var productAPI=require('./product.js');
var articleAPI = require('./article.js');

router.get('/request/get',requestAPI.index);
router.post('/request/store',requestAPI.store);  // CREATE and UPDATE
router.post('/request/delete',requestAPI.delete);

router.post('/user/login', userAPI.login);
router.get('/user/logout',userAPI.logout);

router.get('/category/get',categoryAPI.get);
router.post('/category/store',categoryAPI.store);  // CREATE and UPDATE
router.post('/category/delete',categoryAPI.delete);

/****  ARTICLE API ****/
router.get('/article/get',articleAPI.get);
router.post('/article/store',articleAPI.store);  // CREATE and UPDATE
router.post('/article/delete',articleAPI.delete);

router.get('/product/get',productAPI.get);
router.post('/product/store',productAPI.store);  // CREATE and UPDATE
router.post('/product/delete',productAPI.delete);




router.use(function(req,res){
	res.json({message:'you are requesting my fucking api server'});
});

module.exports=router;