const UserData = require("../Db/userScheema");
const jwt = require("jsonwebtoken");
const { sendMail, sendError, sendSuccess } = require("./helper");
const bycypt = require("bcrypt");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_APISECRET,
});

const salt = 10;

require("dotenv").config();
exports.login = (req, res) => {
  res.send("deepan....");
};

exports.register = async (req, res) => {
  const { name, username, email, password, about, education, skill, address } =
    req.body;

  try {
    if (!name || !username || !email || !password || !about || !address) {
      return res.status(400).send("Required field");
    }

    const existUser = await UserData.findOne({ username });
    if (existUser) {
      return res.status(400).send("UserName already Exist");
    }

    const hashpassword = await bycypt.hash(password, salt);

    if (!hashpassword) {
      return res.status(400).send("password hash error");
    }

    const data = {
      name,
      email,
      address,
      username: username.toLowerCase(),
      password: hashpassword,
      about,
      education: education && education.length > 0 && education,
      skill: skill && skill.length > 0 && skill,
    };

    const create = await UserData.create(data);

    if (!create) {
      return res.status(400).send("created faild");
    }

    const verifyToken = await jwt.sign({ username }, process.env.SECKEY, {
      expiresIn: "1 day",
    });

    let mailsend = "No SEND";
    // html: `<div><h3>Welcome to Folio </h3> <br /> <h3>Create your  portfolio as simple </h3> <br /><a href="http://localhost:3000/deepan/verify?token=${verifyToken}"> Click here to veridy your account</a></div>`,

    // await sendMail(email, "Verify Account", {
    //   html: `<div><h3>Welcome to Folio </h3> <br /> <h3> Your User Name ${username} </h3> <br /><a href="http://localhost:3000/deepan/verify?token=${verifyToken}"> Click here to verify your account</a></div>`,
    // })
    //   .then((res) => {
    //     mailsend = res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    res.status(200).send({ msg: "created success", mailsend });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.verifyAccount = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(400).send("No token");
    }

    await jwt.verify(token, process.env.SECKEY, async (error, decode) => {
      if (error) {
        return res.status(400).send(error);
      } else {
        const username = decode.username;

        const verifyResult = await UserData.findOneAndUpdate(
          { username },
          { verified: true }
        );

        if (!verifyResult) {
          return res.status(400).send("verfiy result error");
        }

        res.status(200).send({ msg: "Verified", username });
      }
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  let { username, password } = req.body;

  username = username.toLowerCase();

  try {
    if (!username || !password) {
      return sendError(res, "Username & password Required");
    }

    const userCheck = await UserData.findOne({ username });

    if (!userCheck) {
      return sendError(res, "No User Found");
    }

    const compare = await bycypt.compare(password, userCheck.password);

    if (!compare) {
      return sendError(res, "Password Not Match");
    }

    const token = await jwt.sign({ username }, process.env.SECKEY, {
      expiresIn: "20 day",
    });

    res.status(200).send(token);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.userNameCheck = async (req, res) => {
  let { username } = req.body;

  username = username.toLowerCase();

  try {
    const checkUserName = await UserData.findOne({ username });

    if (checkUserName) {
      return sendError(res, "User already Exist");
    }

    sendSuccess(res, username);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.userData = async (req, res) => {
  const param = req.params;

  try {
    const userCheck = await UserData.findOne({
      username: param.username,
    }).select("-password");

    if (!userCheck) {
      return sendError(res, "No User Found");
    }

    return sendSuccess(res, userCheck);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.verifyLogin = async (req, res) => {
  const { username } = req.data;

  if (!username) {
    return sendError(res, "no username");
  }

  const userData = await UserData.findOne({ username });

  return sendSuccess(res, userData);
};

exports.profilePicUpload = async (req, res) => {
  const { base64Data } = req.body;

  const { username } = req.data;

  if (!username) {
    return sendError(res, "Auth Failed");
  }
  if (!base64Data) {
    return sendError(res, "Base 64 File String required");
  }

  const folder = `ProfilePic/${username}`;

  const result = await cloudinary.uploader.upload(base64Data, {
    public_id: folder,
  });

  if (!result) {
    return sendError(res, "No Result Somthing wrong");
  }

  const updateProfilePic = await UserData.findOneAndUpdate(
    { username },
    { profilepic: result.url }
  );

  if (!updateProfilePic) {
    return sendError(res, "Somthing Wrong throug update DB");
  }

  sendSuccess(res, result.url);
};

exports.bannerPicUpload = async (req, res) => {
  const { base64Data } = req.body;

  const { username } = req.data;

  if (!username) {
    return sendError(res, "Auth Failed");
  }
  if (!base64Data) {
    return sendError(res, "Base 64 File String required");
  }

  const folder = `Banner/${username}`;

  const result = await cloudinary.uploader.upload(base64Data, {
    public_id: folder,
  });

  if (!result) {
    return sendError(res, "No Result Somthing wrong");
  }

  const updateBannerpic = await UserData.findOneAndUpdate(
    { username },
    { bannerpic: result.url }
  );

  if (!updateBannerpic) {
    return sendError(res, "Somthing Wrong throug update DB");
  }

  sendSuccess(res, result.url);
};

exports.UpdateUserProfile = async (req, res) => {
  const { username } = req.data;

  const data = req.body;

  if (!data) {
    return sendError(res, "No Data");
  }

  const result = await UserData.findOneAndUpdate({ username }, data);

  if (!result) {
    return sendError(res, "DB Update Faild");
  }

  const userData = await UserData.findOne({username})

  if (!userData) {
    return sendError(res, "No Fetch data");
  }

  sendSuccess(res, userData);
};
