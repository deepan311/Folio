const express = require("express")
const userRouter = express.Router()

const { login, register, verifyAccount, userNameCheck, userData, verifyLogin, profilePicUpload, bannerPicUpload, UpdateUserProfile } = require("../Controllers/userController")
const { validToken } = require("../Controllers/middileware")

userRouter.post("/login", login)
userRouter.post("/register", register)
userRouter.post("/verifyemail", verifyAccount)
userRouter.post("/userexist", userNameCheck)
userRouter.post("/uploadprofile",validToken, profilePicUpload)
userRouter.post("/uploadbanner",validToken, bannerPicUpload)
userRouter.post("/updateuser",validToken, UpdateUserProfile)

userRouter.get("/userdata/:username", userData)
userRouter.get("/verifytoken",validToken, verifyLogin)

module.exports = userRouter