const route = require('express').Router();

const utilisateurRTR = require('./utilisateur');
const profileRTR = require('./profile');
const entrepriseRTR = require('./entreprise');
const offreRTR = require('./offre');
const categorieRTR = require('./categorie');
const roleRTR = require('./role');

route.get('', (req, res) => res.status(200).send('Hello world'));

route.use('/api', utilisateurRTR);
route.use('/api/utilisateur', profileRTR);
route.use('/api/entreprise', entrepriseRTR);
route.use('/api/offre', offreRTR);
route.use('/api/categorie', categorieRTR);
route.use('/api/role', roleRTR);

module.exports = route;