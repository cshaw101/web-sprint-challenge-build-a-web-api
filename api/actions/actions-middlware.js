// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

async function validateActionId(req, res, next) {
    try {
        const { id } = req.params;
        const action = await Actions.get(id);
  
        if (action) {
            req.action = action; 
            next();
        } else {
            return res.status(404).json({ message: "action not found" }); 
        }
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving action", error: err.message }); 
    }
}


  async function validateProjectId(req, res, next) {
      const { project_id } = req.body;
  
      try {
          // Check if the project with the given project_id exists
          const project = await Projects.get(project_id);
          if (!project) {
              return res.status(400).json({
                  message: "Invalid project_id, project does not exist",
              });
          }
  
          // If the project exists, proceed to the next middleware or route handler
          next();
      } catch (err) {
          return res.status(500).json({
              message: "Error validating project_id",
              error: err.message,
          });
      }
  }
  
  module.exports = { validateProjectId, validateActionId };