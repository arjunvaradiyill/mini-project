var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    let user=req.session.user
  //  console.log(user);
    res.render('mainpage',{user});
});



module.exports = router;