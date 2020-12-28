'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreditSchema extends Schema {
    up() {
        this.create('credits', (table) => {
            table.increments()
            table.integer('collection_id').unsigned().notNullable()
            table.integer('credited_girls')
            table.integer('credited_boys')
            table.integer('granted_credit')
            table.integer('granted_capital')
            table.integer('interest_for_grants')
            table.timestamps()
        })
    }

    down() {
        this.drop('credits')
    }
}

module.exports = CreditSchema