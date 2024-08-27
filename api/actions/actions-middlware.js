// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateUserId(req, res, next) {
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



  module.exports = {validateUserId}