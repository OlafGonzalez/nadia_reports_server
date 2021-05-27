const router = require('express').Router();
const passport = require('passport')
const appController = require('../controllers/appController');


router.get('/',appController.sigin)

router.get('/home',appController.home)

router.post('/login',passport.authenticate('local-signin',{
    successRedirect:"/home",
    failureRedirect:"/",
    passReqToCallback:true
}))

router.post('/register',passport.authenticate('local-signup',{
    successRedirect:"/admin",
    failureRedirect:"/admin",
    passReqToCallback:true
}))

router.get('/logout', (req,res,next) =>{
    req.logout()
    res.redirect('/')
})

module.exports = router;