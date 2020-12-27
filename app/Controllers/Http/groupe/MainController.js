'use strict'

const Groupe = use('App/Models/Groupe')

class MainController {
    /** ================= get all the groupes available now ------------------- */
    async index({ response }) {
        const groupes = await Groupe.all()

        if (groupes) {
            return response.status(302).send({
                message: 'found',
                data: groupes,
            })
        } else {
            return response.status(204).send({
                message: 'not data found',
            })
        }
    }
}

module.exports = MainController