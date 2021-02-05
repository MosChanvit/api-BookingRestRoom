const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

router.put('/user/:id', async (req, res) => {
    if(!req.body || !req.params.id){
        return res.status(400).send({error:true, message:"data empty"})
    }else{

        const id = req.params.id;
        await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send({error:false ,message:'Update Successfully'});
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
    }

});



module.exports = router;
