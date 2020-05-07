const router = require('express').Router();
const passport = require('passport');
const UserLocal = require('../models/localModel');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth signup
router.get('/sign-up',(req,res)=>{
    res.render('sign-up');
});

//auth local signup
router.post('/local/signup',(req,res)=>{
    if(req.body.username && req.body.password){
        new UserLocal({
            username:req.body.username,
            password:req.body.password
        }).save().then(()=>{
            res.redirect('/auth/login');
        });
    }
    else{
        res.redirect('/auth/login');
    }
});

//auth local login
router.post('/local/login',passport.authenticate('local',{
    failureRedirect:'/auth/login'
}),(req,res)=>{
    // res.send(req.user);
    res.redirect('/profile/');
});
 
// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

;// auth with google+
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}));

// callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile/');
});

module.exports = router;