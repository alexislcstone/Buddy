const router = require('express').Router();
const Conversation= require('../models/conversation')

//new convo with 2 people
router.post('/',async (req,res)=>{
  console.log(req)
  const newConversation = new Conversation({
    members:[req.body.senderId, req.body.receiverId]
  })

  try{
    const savedConvo = await newConversation.save()
    res.status(200).json(savedConvo)
  }catch(err){
    res.status(500).json(err)
  }
})

//get a list of the current user's conversations
router.get("/:userId", async(req,res)=>{
  try{
    const convo = await Conversation.find({
      members:{$in:[req.params.userId]}
    })
    res.status(200).json(convo)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router