'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionRelationSchema extends Schema {
    up() {
        this.create('institution_relations', (table) => {
            table.increments()
            table.integer('members_opened_account')
            table.integer('members_credited_from_bank')
            table.integer('credited_amount_from_bank')
            table.boolean('group_bank_account').defaultTo(false)
            table.boolean('group_bank_credit').defaultTo(false)
            table.integer('amount_credited_from_bank').defaultTo(0)
        })
    }

    down() {
        this.drop('institution_relations')
    }
}

module.exports = InstitutionRelationSchema