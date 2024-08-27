// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')


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












module.exports = router