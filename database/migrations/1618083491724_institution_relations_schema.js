'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionRelationsSchema extends Schema {
  up () {
    this.table('institution_relations', (table) => {
      // alter table
        table.integer("montant_de_credit_bancaire_contracte_groupe").defaultTo(0);
    })
  }

  down () {
    this.table('institution_relations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = InstitutionRelationsSchema
