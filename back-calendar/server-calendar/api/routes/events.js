const express = require('express');
const router = express.Router();

const Event = require('../../lib/event');

router.get('/', (req, res, next) => {
     Event.find({}, (err, data) =>{
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

router.get('/byid/:id', (req, res, next) => {
     var id = req.params.id;

     Event.findOne({_id : id}, (err, data) =>{
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

router.get('/:email', (req, res, next) => {
     var email = req.params.email;
     console.log(email);

     Event.find({email : email}, (err, data) =>{
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
     var event = new Event();

     event.email = req.body.email;
     event.title =  req.body.title;
     event.desc = req.body.desc;
     event.local = req.body.local;
     event.startDate = req.body.startDate;
     event.finishDate =  req.body.finishDate;
     event.over = req.body.over;

     event.save((err, event) =>{
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
                        message: "Event added"
                   }
              });
         }
     });
});

router.delete('/:id', (req, res, next) => {
     var id = req.params.id;

     Event.findOneAndRemove({_id : id}, (err, data) => {
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
                         message: "Event removed"
                    }
               });
          }
     });
});

router.put('/', (req, res, next) => {
     var id = req.body.id;
     Event.findOne({_id : id}, (err, data) => {
          if(err){
               res.status(500);
               res.json({
                    error: {
                         message: "Update error"
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
               data.title = req.body.title;
               data.desc = req.body.desc;
               data.local = req.body.local;
               data.startDate = req.body.startDate;
               data.finishDate = req.body.finishDate;
               data.over = req.body.over;

               data.save((err, update) => {
                    if(err){
                         res.status(500);
                         res.json({
                              error: {
                                   message: "Update error"
                              }
                         });
                    }else{
                         res.status(200);
                         res.json({
                              error: {
                                   message: "Event updated"
                              }
                         });
                    }
               });
          }
     });
});

module.exports = router;
