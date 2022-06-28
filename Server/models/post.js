const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    description: {
      type: String,
      max: 500
    },
    likes: {
      type: Array,
      default: []
    },
    image: {
      type: String,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Posts", postSchema)