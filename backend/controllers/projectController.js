import Project from "../models/projectModel.js";

export const submitProject = async (req, res) => {
  try {
    const { title, description, url } = req.body;

    const newProject = await Project.create({
      title,
      description,
      url,
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      project: newProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};