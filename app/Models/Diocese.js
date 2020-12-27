'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Diocese extends Model {


    /**
     * To override the 'conventional' model table name.
     */
    static get table() {
        return 'dioceses'
    }
}

module.exports = Diocese