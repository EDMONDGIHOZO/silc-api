"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SoldeSchema extends Schema {
  up() {
    this.create("soldes", (table) => {
      table.increments();
      table.integer("collection_id").unique().notNullable();
      table.integer("montant_solde").notNullable().defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("soldes");
  }
}

module.exports = SoldeSchema;
