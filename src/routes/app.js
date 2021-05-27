const router = require('express').Router();
const passport = require('passport')
const appController = require('../controllers/appController');


router.get('/',appController.home)
router.post('/login',passport.authenticate('local-signin',{
    successRedirect:"/coordinador",
    failureRedirect:"/",
    passReqToCallback:true
}))

router.post('/register',passport.authenticate('local-signup',{
    successRedirect:"/usuarios",
    failureRedirect:"/usuarios",
    passReqToCallback:true
}))

router.get('/logout', (req,res,next) =>{
    req.logout()
    res.redirect('/')
})

module.exports = router;