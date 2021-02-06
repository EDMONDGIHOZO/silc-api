"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EntraideSchema extends Schema {
  up() {
    this.create("entraides", (table) => {
      table.increments();
      table.integer("collection_id").notNullable().unique();
      table.integer("valeur_entrees").defaultTo(0);
      table.integer("valeur_sorties").defaultTo(0);
      table.integer("membres_soutenus").defaultTo(0);
    });
  }

  down() {
    this.drop("entraides");
  }
}

module.exports = EntraideSchema;
