const UserData = require("../Db/userScheema");
const { sendError, sendSuccess } = require("./helper");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_APISECRET,
});

exports.addProject = async (req, res) => {
  try {
    const { username } = req.data;

    const uid = uuidv4();

    const { imageBase64, title, description, link, github } = req.body;

    if ((!imageBase64, !title, !description)) {
      return sendError(res, "Required fields");
    }

    const folderName = `project/${username}/${title}-${uid}`;

    const result = await cloudinary.uploader.upload(imageBase64, {
      public_id: folderName,
    });

    if (!result) {
      return sendError(res, "Could not upload photo");
    }

    const data = { title, description, img: result.url, link, github, uid };

    const update = await UserData.findOneAndUpdate(
      { username },
      { $push: { project: data } }
    );

    if (!update) {
      return sendError(res, "Not Update in DB");
    }

    const Project = await UserData.findOne({ username });

    sendSuccess(res, Project.project);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteProject = async (req, res) => {
  const { username } = req.data;

  // console.log(username)

  const { uid, title } = req.body;

  console.log(uid)

  const db_delete = await UserData.findOneAndUpdate(
    { username },
    { $pull: {project: {uid} } }
  );

  // console.log(db_delete)

  if (!db_delete) {
    return sendError(res, "DB Couldn't delete");
  }

  const folderName = `project/${username}/${title}-${uid}`;

  const cloudResult = await cloudinary.uploader.destroy(folderName);

  if (!cloudResult) {
    return sendError(res, "Not Contain");
  }
  sendSuccess(res, cloudResult);
};
