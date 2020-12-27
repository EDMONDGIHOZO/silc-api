'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiocesesSchema extends Schema {
    up() {
        this.create('dioceses', (table) => {
            table.increments()
            table.string('name').notNullable().unique()
            table.timestamps()
        })
    }

    down() {
        this.drop('dioceses')
    }
}

module.exports = DiocesesSchema