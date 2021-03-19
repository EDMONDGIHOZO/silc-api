"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeneralRecordSchema extends Schema {
  up() {
    this.table("general_records", (table) => {
      // alter table
      table.integer("group_id").notNullable();
    });
  }

  down() {
    this.table("general_records", (table) => {
      // reverse alternations
    });
  }
}

module.exports = GeneralRecordSchema;
