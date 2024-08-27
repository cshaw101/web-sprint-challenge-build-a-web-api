// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { validateUserId } = require('./projects-middleware')


const router = express.Router()

router.get('/', async (req, res) => {
    const projects = await Projects.get()
    
    try {
        if (!projects) {
            return res.json({})
        }else {
            return res.json(projects)
        }
    }catch (err) {
        res.status(404).json({message:'GET /projects/ isnt working!'})
    }
})

router.get('/:id', validateUserId, async (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({
          message: "Please include both name and description",
        });
      }

      try {
        const newProject = await Projects.insert(req.body);
    
        return res.status(201).json(newProject);
      } catch (err) {

        return res.status(500).json({
          message: "Error creating project",
          error: err.message,
        });
      }
});


router.put('/:id',validateUserId, async (req, res) => {
    const { name, description, completed } = req.body;

    if (name === undefined || description === undefined || completed === undefined) {
        return res.status(400).json({ message: "Please include name, description, and completed fields" });
    }
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);

        if (updatedProject) {
            return res.status(200).json(updatedProject);
        } else {
            return res.status(404).json({ message: "Project not found" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error updating project", error: err.message });
    }
});


router.delete('/:id',validateUserId, async (req, res) => {
try {
    const deletedProject = await Projects.remove(req.params.id)
    if (deletedProject) {
        res.status(200).json({ message: "Project deleted successfully" });
    }else {
        res.status(404).json({ message: "Project not found" });
    }
}catch(err) {
    return res.status(500).json({ message: "Error deleting project", error: err.message });
}
})

router.get('/:id/actions', (req, res) => {
    
})









module.exports = router