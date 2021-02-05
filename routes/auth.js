const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name,
    username,
    password,
    phone,
    email,
    citizenId
  } = req.body;
  
  if (!name || !username || !password ||!phone || !email || !citizenId) {
    return res.status(400).send({error:true, message:"Press provide again "})
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    username,
    password: passwordHash,
    phone,
    email,
    citizenId
  });

  await user.save((err, data) => {
    if(data) {
        
        return res.send({error:false ,message:'Register successfully'});

    } 
    else {
      
      res.status(500).send(err);
    }
  })

 
});

router.post(
  '/login',
  async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render('register', { message: 'Please try again' });
    }

    const user = await User.findOne({
      username
    });

    if (user) {
      const isCorrect = bcrypt.compareSync(password, user.password);

      if (isCorrect) {
        return res.send({error:false ,message:'login successfully'});
      } else {
        return res.send({error:false ,message:'Username or Password incorrect'});
      }
    } else {
      return res.send({error:false ,message:'Username does not exist.'});
    }
  }
);

module.exports = router;
