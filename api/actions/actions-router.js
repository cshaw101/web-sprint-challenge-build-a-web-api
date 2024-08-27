// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const { validateActionId, validateProjectId } = require('./actions-middlware')


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

router.get('/:id', validateActionId, async (req, res) => {
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

router.put('/:id', validateActionId, validateProjectId, async (req,res) => {
    const { notes, description, completed, project_id } = req.body;

    if (notes === undefined || description === undefined || completed === undefined || project_id === undefined) {
        return res.status(400).json({ message: "Please include notes, description, project_id, and completed fields" });
    }

    try {
        const updatedAction = await Actions.update(req.params.id, { notes, description, completed, project_id });

        if (updatedAction) {
            return res.status(200).json(updatedAction);
        } else {
            return res.status(404).json({ message: "Action not found" });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Error updating action",
            error: err.message,
        });
    }
});



router.delete('/:id',validateActionId, async (req,res) => {
    try{
        const deletedAction = await Actions.remove(req.params.id);
        if (deletedAction) {
            res.status(200).json({ message: "Action deleted successfully" });
        }else {
            res.status(404).json({ message: "Action not found" });
        }
    }catch(err) {
        return res.status(500).json({
            message: "Error deleting action",
            error: err.message,
        });
    }
})






module.exports = router