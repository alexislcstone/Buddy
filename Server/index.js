const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")


dotenv.config();

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/post", postRoute)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)))
  .catch(err => console.log(err))

