"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class InstitutionRelationSchema extends Schema {
  up() {
    this.create("institution_relations", (table) => {
      table.integer("collection_id").notNullable().unique();
      table.integer("membres_ouvert_compte_bancaire").defaultTo(0);
      table.integer("membres_contracte_credit_bancaire").defaultTo(0);
      table.integer("groupe_ouvert_compte_bancaire").defaultTo(0);
      table.integer("groupe_ayant_contracte_credit_bancaire").defaultTo(0);
      table.integer("montant_de_credit_bancaire_contracte").defaultTo(0);
    });
  }

  down() {
    this.drop("institution_relations");
  }
}

module.exports = InstitutionRelationSchema;
