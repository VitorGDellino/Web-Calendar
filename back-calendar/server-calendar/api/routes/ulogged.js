const express = require('express');
const router = express.Router();

const Logged = require('../../lib/logged');

router.get('/', (req, res, next) => {

     Logged.find({}, (err, data) => {
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
     var id = req.body.id;

     Logged.findOneAndRemove({id : id}, (err, data) => {
          var logged =  new Logged();
          logged.id = id;
          logged.email = req.body.email;

          logged.save((err, data) => {
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
                         message: "logged"
                    });
               }
          });
     });
});

router.delete('/:id', (req, res, next) => {
     var id = req.params.id;

     Logged.findOneAndRemove({id : id}, (err, data) => {
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
               res.json({
                    error: {
                         message: "Logged removed"
                    }
               });
          }
     });
});

module.exports = router;
