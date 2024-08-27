const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
// Configure your server here
server.use(express.json());
server.use('/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send('Hello, im Working!');
});



server.use('*', (req, res) => {
    res.status(404).json({ message: 'this does not exist you messed it up' });
  });


// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
