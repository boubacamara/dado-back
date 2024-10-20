const router = require('express').Router();
const candidatCTR = require('../controllers/candidature.action.controller')
const { authRequise } = require('../middlewares/auth');

router.put('/:offreId/:candidatId/accepter', authRequise, candidatCTR.accepter);
router.put('/:offreId/:candidatId/refuser', authRequise, candidatCTR.refuser);

module.exports = router;