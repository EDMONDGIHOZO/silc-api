'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RebursementSchema extends Schema {
    up() {
        this.create('rebursements', (table) => {
            table.increments()
            table.integer('rebursed_capital')
            table.integer('rebursed_interest')
            table.timestamps()
        })
    }

    down() {
        this.drop('rebursements')
    }
}

module.exports = RebursementSchema