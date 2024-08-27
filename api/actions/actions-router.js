// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const { validateUserId } = require('./actions-middlware')


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









module.exports = router