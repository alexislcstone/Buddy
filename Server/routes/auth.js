const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    console.log(req.body)
    const newUser = new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPass
    })
    console.log({newUser})
    try{
      const user = await newUser.save();
      console.log({user})
      res.status(200).json(user);
    }catch(err){
      console.log(err)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if(!user){
      res.status(404).send("user not found")
    }else{
      const validate = await bcrypt.compare(req.body.password, user.password)
      if(!validate){
        res.status(400).json('wrong password')
      }else{
        res.status(200).json(user)
      }
    }

  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
