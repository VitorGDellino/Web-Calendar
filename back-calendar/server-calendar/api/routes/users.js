const express = require('express');
const router = express.Router();

const User = require('../../lib/user');

router.post('/login', (req, res, next) => {
     var email = req.body.email;
     var password = req.body.password;

     User.findOne({email : email, password : password}, (err, data) =>{
          if(err){
               res.status(500);
               res.json({
                    error: {
                         message: "Get error"
                    }
               });
          }else if(!data){
               res.status(404);
               res.json({
                    error: {
                         message: "Not found"
                    }
               });
          }else{
               res.status(200);
               res.json(data);
          }
     });
});

router.post('/', (req, res, next) => {
     var user = new User();

     user.email = req.body.email;
     user.password = req.body.password;
     user.name = req.body.name;
     user.lastname = req.body.lastname;

     user.save((err, user) =>{
          if(err){
               res.status(500);
               res.json({
                    error: {
                         message: "Add error"
                    }
              });
         }else{
              res.status(200);
              res.json({
                   success: {
                        message: "User added"
                   }
              });
         }
     });
});

module.exports = router;
