const router = require('express').Router();
const { authRequise } = require('../middlewares/auth')
const offreCTR = require('../controllers/offre');
const offreVLD = require('../core/validation/offre');

router.get('/:id/recuperer', authRequise, offreCTR.recuperer);
router.get('/recuperers', offreCTR.recupererToutes);
router.get('/recruteur/recuperers', authRequise, offreCTR.recuperersRecruteur);
router.post('/enregistrer', authRequise, offreVLD.creation, offreCTR.enregistrer);
router.put('/:id/modifier', authRequise, offreVLD.modifier, offreCTR.modifier);
router.get('/:id/candidature', authRequise, offreCTR.candidature);
router.delete('/:id/candidature-suppression', authRequise, offreCTR.supprimerCandidature);
router.delete('/:id/supprimer', authRequise, offreCTR.supprimer);
router.put('/:id/modifierCandidature', authRequise, offreCTR.modifierCandidature);

module.exports = router;