const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      unique: true
    },
    firstname:{
      type: String,
      required: true,
    },
    lastname:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    profilePicture: {
      type: String,
      default: ""
    },
    coverPicture: {
      type: String,
      default: ""
    },
    followers: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    description: {
      type: String,
      max: 50
    },
    city: {
      type: String,
      max: 50
    },
    from: {
      type: String,
      max: 50
    },
    worksAt: {
      type: String,
      max: 50
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3]
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("User", userSchema)