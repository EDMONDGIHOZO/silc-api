'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GeneralRecordSchema extends Schema {
    up() {
        this.create('general_records', (table) => {
            table.increments()
            table.date('collection_date').notNullable()
            table.integer('group_id').notNullable()
            table.integer('abandons').defaultTo(0)
            table.integer('new_members').defaultTo(0)
            table.integer('registered_members').notNullable()
            table.integer('boys_attended')
            table.integer('girls_attended')
            table.string('collector_name')
            table.timestamps()
        })
    }

    down() {
        this.drop('general_records')
    }
}

module.exports = GeneralRecordSchema