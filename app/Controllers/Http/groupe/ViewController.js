'use strict'

const Groupe = use('App/Models/Groupe')

class ViewController {
    /** ================= get all the groupes available now ------------------- */
    async index({ response }) {
        const groupes = await Groupe.query().with('diocese').with('paroisse').fetch()

        if (groupes) {
            return response.status(200).send({
                message: 'found',
                data: groupes,
            })
        } else {
            return response.status(204).send({
                message: 'not data found',
            })
        }
    }

    /** for form filling purpose */
    async indexAll({ response }) {
        const groupes = await Groupe.query().distinct('name', 'id').fetch()

        if (groupes) {
            return response.status(200).send({
                message: 'found',
                data: groupes,
            })
        } else {
            return response.status(204).send({
                message: 'not data found',
            })
        }
    }

    /** ================= get single groupe ------------------- */
    async show({ params, response }) {
        const groupe = await Groupe.query().where('id', params.id).with('collections').first()
        if (groupe) {
            return response.status(302).send({
                message: 'found',
                data: groupe,
            })
        } else {
            return response.status(204).send({
                message: 'not data found',
            })
        }
    }
}

module.exports = ViewController
