'use strict'

// this is for actroyes

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Credit extends Model {
    collection() {
        return this.belongsTo('App/Models/GeneralRecord', 'collection_id', 'id')
    }

    static get updatedAtColumn() {
        return null
    }

    static get createdAtColumn() {
        return null
    }


    /**
     * Hide/Omit Fields From JSON Output
     */
    static get hidden() {
        return ['collection_id']
    }
}

module.exports = Credit