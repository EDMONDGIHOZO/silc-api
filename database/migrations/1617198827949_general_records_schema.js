"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeneralRecordsSchema extends Schema {
  up() {
    this.table("general_records", (table) => {
      // alter table
      table.string("mois_de").defaultTo("1");
    });
  }

  down() {
    this.table("general_records", (table) => {
      // reverse alternations
    });
  }
}

module.exports = GeneralRecordsSchema;
