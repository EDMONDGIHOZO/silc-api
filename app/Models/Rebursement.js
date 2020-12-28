'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rebursement extends Model {
    collection() {
        return this.belongsTo('App/Models/GeneralRecord', 'collection_id', 'id')
    }
}

module.exports = Rebursement