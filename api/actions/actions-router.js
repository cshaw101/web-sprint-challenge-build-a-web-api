// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const { validateUserId, validateProjectId } = require('./actions-middlware')


const router = express.Router()


router.get('/', async (req, res) => {
    const actions = await Actions.get()

    try{
        if (!actions) {
            return res.status(404).json({})
        }else {
            return res.status(200).json(actions)
        }
    }catch(err){
        res.status(404).json({message:'GET /actions/ isnt working!'})
    }
})

router.get('/:id', validateUserId, async (req, res) => {
    res.status(200).json(req.action);
})

router.post('/',validateProjectId, async (req, res) => {
    const { notes, description, project_id } = req.body;

    if (!notes || !description || !project_id) {
        return res.status(400).json({
            message: "Please include notes, description, and project_id ",
        })
    }

    try{
        const newAction = await Actions.insert(req.body);
        return res.status(200).json(newAction)
    }catch(err) {
        return res.status(500).json({
            message: "Error creating action",
            error: err.message,
          });
    }
})







module.exports = router