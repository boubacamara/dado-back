const route = require('express').Router();

const utilisateurRTR = require('./utilisateur');
const profileRTR = require('./profile');
const entrepriseRTR = require('./entreprise');
const offreRTR = require('./offre');
const categorieRTR = require('./categorie');
const roleRTR = require('./role');
const mediaRTR = require('./media');
const candidatRTR = require('./candidat.action.route');

route.get('', (req, res) => res.status(200).send('Hello world'));

route.use('/api', utilisateurRTR);
route.use('/api/utilisateur', profileRTR);
route.use('/api/entreprise', entrepriseRTR);
route.use('/api/offre', offreRTR);
route.use('/api/categorie', categorieRTR);
route.use('/api/role', roleRTR);
route.use('/api/candidat', candidatRTR);

route.use('/api', mediaRTR);

module.exports = route;
