// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const project = await Projects.get(id);
  
        if (project) {
            req.project = project; // set the correct variable name
            next();
        } else {
            return res.status(404).json({ message: "Project not found" }); // adjusted error message
        }
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving project", error: err.message }); // adjusted error message
    }
}


  module.exports = {validateUserId}