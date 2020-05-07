const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const profile = require('./routes/profile-routes');

app.set("view engine",'ejs');

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['encrypt']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/passportjs',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{ console.log('connected to mongodb');});

app.use('/auth', authRoutes);
app.use('/profile',profile);

app.get('/',(req,res)=>{
    res.render('home',{ user: req.user });
});

app.listen(3000,()=>{ console.log("listening on 3000...")});