const router = require('express').Router();
const Post = require('../models/post')
const User = require('../models/user')

router.post("/", async (req, res) => {
  const newPost = new Post(req.body)
  try {
    await newPost.save()
    res.status(200).json(newPost)
  } catch (err) {
    re.status(500).json(err)
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  const { userId } = req.body
  try {
    const post = await Post.findById(id)
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('Updated Post')
    } else {
      res.status(403).json('Not Your Post. Cannot Update')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.query.userId
  try {
    const post = await Post.findById(id)
    if (post.userId === userId) {
      await post.deleteOne()
      res.status(200).json('Successfully Deleted')
    } else {
      res.status(403).json('Not Your Post. Cannot Delete')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put("/:id/like", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body
  try {
    const post = await Post.findById(id)
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } })
      res.status(200).json('Liked!')
    } else {
      await post.updateOne({ $pull: { likes: userId } })
      res.status(403).json('Unliked')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    //all the posts of the currentUser
    const userPosts = await Post.find({
    userId: req.params.userId
    }).sort({ updatedAt: -1 })
    //all the posts of the current Users followers
    const followerPosts = await Promise.all(
      currentUser.following.map(followerId => {
        return Post.find({ userId: followerId }).sort({ updatedAt: -1 })
      })
    )
    res.status(200).json(userPosts.concat(...followerPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.username})
    const userPosts = await Post.find({userId: user._id})
    res.status(200).json(userPosts)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/profile/:username/images", async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.username})
    const userPosts = await Post.find({userId: user._id})
    let postImages = []
    userPosts.map(post=>{
      post.image? postImages.push(post.image):null;
    })
    console.log(postImages)
    res.status(200).json(postImages)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router