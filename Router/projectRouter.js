const express = require("express");
const projectRouter = express.Router();

const { addProject, deleteProject } = require("../Controllers/projectController");
const { validToken } = require("../Controllers/middileware");

projectRouter.post("/addproject",validToken, addProject);
projectRouter.post("/delete",validToken, deleteProject);

module.exports = projectRouter;
