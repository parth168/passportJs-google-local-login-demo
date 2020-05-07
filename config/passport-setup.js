const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const localStrategy = require('passport-local').Strategy;

const User = require('../models/googleModel');
const UserLocal = require('../models/localModel');

passport.serializeUser((user,done)=>{
    console.log("in serialize");
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    console.log("deserialize");
    User.findById(id).then((user)=>{
        if(user){
            done(null,user);
        }
        else{

            UserLocal.findById(id).then((user)=>{
                done(null,user);
            });
        }
    });
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID:'Client_Id',
        clientSecret:'Client_Secret',
        callbackURL:'/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({googleid:profile.id})
            .then((user)=>{
                if(user){
                    done(null,user);
                }
                else{
                    new User({
                        username:profile.displayName,
                        googleid:profile.id
                    }).save().then((newUser)=>{
                        console.log(newUser);
                        done(null,newUser);
                    });
                }
            });

    })
);

passport.use(
    new localStrategy({},(username,password,done)=>{
        UserLocal.findOne({username:username})
                .then((user)=>{
                    if(user){
                        if(password == user.password){
                            done(null,user);
                        }
                        else{
                            done(null,false);
                        }
                    }
                    else{
                        done(null,false);
                    }
                })
    })
);
