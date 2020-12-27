'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GroupesSchema extends Schema {
    up() {
        this.create('groupes', (table) => {
            table.increments()
            table.string('name').notNullable()
            table.string('group_code').unique()
            table.integer('initial_girls_number').notNullable()
            table.integer('initial_boys_number').notNullable()
            table.integer('diocese_id').notNullable()
            table.integer('paroisse_id').notNullable()
            table.integer('credit_group_max_time')
            table.integer('monthly_interest')
            table.date('start_date')
            table.date('end_date')
            table.timestamps()
        })
    }

    down() {
        this.drop('groupes')
    }
}

module.exports = GroupesSchema