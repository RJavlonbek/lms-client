var express = require('express');
var mongoose=require('mongoose');
var path=require('path');
var bodyParser=require('body-parser');
var session=require('express-session');
const fileUpload = require('express-fileupload');
const slugUpdater = require('mongoose-slug-updater');

mongoose.plugin(slugUpdater);

const authMiddleware=require('./middleware/auth.js');

var app=express();

// Connect database
//const mongoDBUrl='mongodb://178.33.123.109:27017/t1-form';
const mongoDBUrl='mongodb+srv://javlonbek:12345rj98@fintech-ahsxv.mongodb.net/medium?retryWrites=true&w=majority';
mongoose.connect(mongoDBUrl,{useNewUrlParser:true});
mongoose.connection.once('open',function(){
  console.log('Connected to the database');
}).on('error',function(error){
  console.log('There is an error in connecting db: '+error);
});

app.use(express.static(path.join(__dirname,'..','client','build')));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  cookie:{
    maxAge:6*3600*1000  // 6 hours
  },
  resave: true, 
  saveUninitialized: true, 
  secret: 'JavlonbekProduction'
}));

app.post('*',function(req,res,next){
  console.log('post request');
  console.log(req.body);
  next();
});

app.post('/admin/login',require('./api/user.js').login);
app.get('/user/active', require('./api/user.js').getActive);

app.use('/api',authMiddleware,require('./api/index.js'));

app.use(function(req,res,next){
  if(app.get('env')==='development'){
    res.sendFile(path.join(__dirname,'..','client','build','index.html'));
    //res.send('default response');
  }else{
    console.log('env',app.get('env'));
    res.sendFile(path.join(__dirname,'..','client','build','index.html'));
  }
});

app.use(function(err, req, res, next) {
  console.log('environment '+app.get('env'));
  console.log('Error: ',err.message);
  res.status(err.status||500).end();
});

const port=process.env.PORT||3001;
app.listen(port);
console.log('now, server and theme are working on ',port);