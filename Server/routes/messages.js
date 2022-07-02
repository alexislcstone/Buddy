const router = require('express').Router();
const Message= require('../models/msg')

//new convo with 2 people
router.post('/',async (req,res)=>{
  console.log(req)
  const newMessage = new Message(req.body)

  try{
    const savedMsg = await newMessage.save()
    res.status(200).json(savedMsg)
  }catch(err){
    res.status(500).json(err)
  }
})
//gets list of messages bassed on convo id
router.get("/:convoId", async(req,res)=>{
  try{
    const messages = await Message.find({
      conversationId:req.params.convoId
    })
    res.status(200).json(messages)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router