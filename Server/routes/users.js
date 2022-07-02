const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

//updating user information
router.put("/:id", async (req, res) => {
  console.log(req.body,req.params.id)
  if (req.body._id === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
      res.status(200).json('success')
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can only update your own account")
  }

})

//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('Account has been deleted!')
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can only delete your own account")
  }
})

//get user by id
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  console.log(userId,username)
  try {
    const user = userId?await User.find({_id:userId}):await User.find({username:username})
    const { password, updatedAt, ...other } = user[0]
    res.status(200).json(other._doc)
  } catch (err) {
    res.status(500).json(err)
  }
}
)

//follow
router.put("/:id/follow", async (req, res) => {
  const id = req.params.id
  const userId = req.body.userId
  console.log(id,userId)
  if (userId === id) {
    res.status(403).json("You cannot follow yourself")
  } else {
    try {
      const followThem = await User.findById(id)
      const meUser = await User.findById(userId)

      if (!meUser.following.includes(id)) {
        await followThem.updateOne({ $push: { followers: userId } })
        await meUser.updateOne({ $push: { following: id } })
        res.status(200).json("Followed!")
      } else {
        res.status(403).json("You have already followed this user")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
})

//unfollow
router.put("/:id/unfollow", async (req, res) => {
  const id = req.params.id
  const userId = req.body.userId
  if (userId === id) {
    res.status(403).json("You cannot unfollow yourself")
  } else {
    try {
      const followThem = await User.findById(id)
      const meUser = await User.findById(userId)
      if (followThem.followers.includes(userId)) {
        await followThem.updateOne({ $pull: { followers: userId } })
        await meUser.updateOne({ $pull: { following: id } })
        res.status(200).json("Unfollowed")
      } else {
        res.status(403).json("You are not following this user")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
})

router.get('/friends/:userId',async(req,res)=>{
  try{
    const user = await User.findById(req.params.userId)

    const friends = await Promise.all(
      user.following.map(friendId=>{
        console.log(friendId)
        return User.findById(friendId)
      })
    )
    let friendList = [];
    friends.map(friend=>{
      const {_id,username,profilePicture,firstname,lastname}=friend
      friendList.push({_id,username,profilePicture,firstname,lastname})
    })
    res.status(200).json(friendList)
  }catch(err){
    res.status(500).json(err)
  }
})

router.get('/nonfriend/:userId', async(req,res)=>{
  try{
    const user = await User.findById(req.params.userId)
    const users = await User.find({})
    const nonfriend = [];
    let lim=0;
    if(users.length>20){
      lim += 20;
    }else{
      lim +=users.length
    }
    console.log(lim)
    for(let i = 0; i < lim; i++){
      console.log(JSON.stringify(users[i]._id) === JSON.stringify(user._id))
      if(user.following.includes(users[i]._id) || JSON.stringify(users[i]._id) === JSON.stringify(user._id)){
        continue;
      }else{
        const {_id,username,profilePicture,firstname,lastname}=users[i]
        nonfriend.push({_id,username,profilePicture,firstname,lastname})
      }
    }
   res.status(200).json(nonfriend)
  }catch(err){
    console.log(err)
  }
})

module.exports = router
