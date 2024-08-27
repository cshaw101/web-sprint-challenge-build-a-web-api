// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const project = await Projects.get(id);
  
        if (project) {
            req.project = project; 
            next();
        } else {
            return res.status(404).json({ message: "Project not found" }); 
        }
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving project", error: err.message }); 
    }
}



  module.exports = {validateUserId}