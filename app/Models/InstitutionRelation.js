'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InstitutionRelation extends Model {
    collection() {
        return this.belongsTo('App/Models/GeneralRecord', 'collection_id', 'id')
    }

    static get updatedAtColumn() {
        return null
    }

    static get createdAtColumn() {
        return null
    }
}

module.exports = InstitutionRelation