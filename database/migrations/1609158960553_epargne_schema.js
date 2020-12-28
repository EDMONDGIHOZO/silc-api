'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EpargneSchema extends Schema {
    up() {
        this.create('epargnes', (table) => {
            table.increments()
            table.integer('collection_id').unsigned().notNullable().unique()
            table.integer('amount')
            table.timestamps()
        })
    }

    down() {
        this.drop('epargnes')
    }
}

module.exports = EpargneSchema