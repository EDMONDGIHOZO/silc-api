"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EpargneSchema extends Schema {
  up() {

    this.create("epargnes", (table) => {
      table.increments();
      table
        .integer("collection_id")
        .unsigned()
        .references("id")
        .inTable("general_records")
        .notNullable()
        .unique();

      table.foreign("collection_id").onDelete("CASCADE");
      table.integer("valeur_total_epargne_realise_mois").defaultTo(0);
    });
  }

  down() {
    this.drop("epargnes");
  }
}

module.exports = EpargneSchema;
