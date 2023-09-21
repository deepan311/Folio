const jwt = require("jsonwebtoken");
const { sendError } = require("./helper");
const UserData = require("../Db/userScheema");

exports.validToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return sendError(res, "No Token");
  }

  await jwt.verify(token, process.env.SECKEY, async(err, decode) => {
    if (err) {
      return sendError(res, err);
    }

    const {username} = decode;

    const currentUserName = await UserData.findOne({username})

    if(!currentUserName){
      return sendError(res,"User Not in DB")
    }
    req.data= {username:currentUserName.username}

    next();
  });
};
