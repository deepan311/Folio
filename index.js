const express = require("express")
const userRouter = require("./Router/userRouter")
const connection = require("./Db/connection")
const cors = require("cors")
const bodyParser = require("body-parser") 
const projectRouter = require("./Router/projectRouter")

require("dotenv").config()
const app = express()


app.use(cors({origin:"*"}))

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));


connection.then(()=>{
    console.log("DB connected successfully")
}).catch(err=>{
    console.log(err)
})

app.use("/api/user", userRouter)
app.use("/api/project", projectRouter)

app.listen(8000, () => {
    console.log("server running")
})
