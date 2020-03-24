const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/', (req, res) => res.send('Hello World! Teste'));

routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.Store);
routes.get('/incidents', IncidentController.Index);
routes.delete('/incidents/:id', IncidentController.Destroy);

routes.get('/profile', ProfileController.Index);
routes.get('/session', SessionController.Store);


module.exports = routes;