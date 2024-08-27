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










module.exports = router