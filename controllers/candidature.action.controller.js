const { mailNotification } = require('../core/shared/mail.notification');
const { UtilisateurOffres, Utilisateur, Profile, Offre } = require('../models')
const {CONFERENCE_URL} = process.env;

exports.accepter = async (req, res) => {
    const offreId = parseInt(req.params.offreId);
    const candidatId = parseInt(req.params.candidatId);
    const {commentaire} = req.body

    try {
        const candidature = await UtilisateurOffres.findOne({
            where: {
                offreId,
                UtilisateurId: candidatId
            }
        });

        if(!candidature) return res.status(404).json({msg: `Cette candidature n'existe pas ou plus`});

        candidature.statut = req.body.statut;

        let candidatSauv = await candidature.save();
        
        if(candidatSauv) {
            let info = await sendMailAccepter(candidature.utilisateurId, offreId, commentaire);

            return res.status(200).json({msg: `La candidature a été accepté, est sera averti par mail`});
        }
        return res.status(404).json({msg: `Veuillez réessayer plus tard, le serveur n'a pas pu répondre`})
    } catch (error) {
        res.status(500).json({msg: 'Erreur interne du serveur'})
    }
}

exports.refuser = async (req, res) => {
    const offreId = parseInt(req.params.offreId);
    const candidatId = parseInt(req.params.candidatId);

    try {
        const candidature = await UtilisateurOffres.findOne({
            where: {
                offreId,
                UtilisateurId: candidatId
            }
        });

        if(!candidature) return res.status(404).json({msg: `Cette candidature n'existe pas ou plus`});

        candidature.statut = req.body.statut;

        let candidatSauv = await candidature.save();

        if(candidatSauv) {
            let info = await sendMailRefuser(candidature.utilisateurId, offreId);

            return res.status(200).json({msg: `La candidature n'a pas été retenue, est sera averti par mail`});
        }
        return res.status(404).json({msg: `Veuillez réessayer plus tard, le serveur n'a pas pu répondre`})

    } catch (error) {
        res.status(500).json({msg: `Erreur interne du serveur`})
    }

}

async function sendMailAccepter(candidatId, offreId, commentaire) {

    const offre = await Offre.findByPk(offreId);
    const candidat = await Utilisateur.findByPk(candidatId, {
        include: [{
                model: Profile,
                as: 'profile'
            }]
    });

    let htmlMessage = `
        <h4>${candidat?.profile?.prenom} ${candidat?.profile?.nom}</h4>
        <p>Votre candidature a été retenue pour le poste de: ${offre.titre}.<br>
        Vous êtes convié à un entretien le: ${commentaire} <a href="${CONFERENCE_URL+candidat?.profile?.nom}">en suivant ce lien</a></p>  
    `
    return await mailNotification({
        to: candidat.email,
        subject: `${candidat?.profile?.prenom}, votre candidature a été retenue`,
        html: htmlMessage
    })
}

async function sendMailRefuser(candidatId, offreId) {

    const offre = await Offre.findByPk(offreId);
    const candidat = await Utilisateur.findByPk(candidatId, {
        include: [{
                model: Profile,
                as: 'profile'
            }]
    });

    let htmlMessage = `
        <h4>${candidat?.profile?.prenom} ${candidat?.profile?.nom}</h4>
        <p>Nous vous remercions d'avoir pris le temps de postuler pour le poste de ${offre.titre}. Après une étude attentive de votre profil, nous sommes au regret de vous informer que nous ne donnerons pas suite à votre candidature</p>  
    `
    return await mailNotification({
        to: candidat.email,
        subject: `${candidat?.profile?.prenom}, votre candidature n'a pas été retenue`,
        html: htmlMessage
    })
}