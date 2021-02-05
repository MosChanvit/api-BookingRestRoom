const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const restRoom = require('../models/restRoom');
const Booking = require('../models/Booking');



router.get(
    '/restroom',
    async (req, res) => {

        await restRoom.find()
            .then(restRoom => {
                res.send(restRoom)
            })
            .catch(err => {
                res.send({error:false ,message:'Username does not exist.'});
            })

    }
  );

  router.get(
    '/restroom/:id',
    async (req, res) => {

        await restRoom.findOne({_id:req.params.id})
            .then(restRoom => {
                res.send(restRoom)
            })
            .catch(err => {
                res.send({error:false ,message:'restroom empty.'});
            })

    }
  );

  router.get(
    '/restroom/name',
    async (req, res) => {

        await restRoom.find()
            .then(restRoom => {
                res.send(restRoom)
            })
            .catch(err => {
                res.send({error:false ,message:'restroom empty.'});
            })

    }
  );

  router.put(
    '/Booking',
    async (req, res) => {
        const id_user =  req.body.id_user;
        const id_restRoom  =  req.body.id_restRoom;
        const Booking_numberofroom  =  req.body.Booking_numberofroom;

          if (!id_user || !id_restRoom || !Booking_numberofroom) {
            return res.status(400).send({error:true, message:"Press provide again "})
          }

        await restRoom.find({'_id' : id_restRoom} )
            .then(result => {
                result.forEach(function(restroom){
                    if(restroom.isActive){
                        if(restroom.left > 0){
                            if (restroom.left > Booking_numberofroom) {

                                restRoom.findByIdAndUpdate({'_id':id_restRoom},{"left":restroom.left-1}, function(err, result){
                                    if(err){res.send(err)}
                                    else{
                                        const booking = new Booking({
                                            id_user,
                                            id_restRoom
                                          });
                                          booking.save((err, data) => {
                                            if(data) {
                                                res.send({error:false ,message: id_user+' booking successfully'});
                                            } 
                                            else {
                                              res.send(err);
                                            }
                                          })
                                    }
                                })
                            }else{
                                res.send({message:'The rooms are not enough.We have only '+restroom.left +' rooms'});
                            }
                        }else{
                            res.send({message:'RestRoom Full'});
                        }
                    }else{
                        res.send({message:'RestRoom Not Active'});
                    }
                 });
            })
            .catch(err => {
                res.status(500).send({error:true ,message:'Error.'});
            })

    }
  );
    

module.exports = router;
