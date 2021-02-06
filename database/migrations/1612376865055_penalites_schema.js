"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PenalitesSchema extends Schema {
  up() {
    this.create("penalites", (table) => {
      table.increments();
      table.integer("collection_id").notNullable().unique();
      table.integer("Membres_punis").defaultTo(0);
      table.integer("Montant_des_penalites_payees");
    });
  }

  down() {
    this.drop("penalites");
  }
}

module.exports = PenalitesSchema;
