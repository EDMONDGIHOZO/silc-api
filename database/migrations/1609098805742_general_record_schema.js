"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeneralRecordSchema extends Schema {
  up() {
    this.create("general_records", (table) => {
      table.increments();
      table.date("collection_date").notNullable();
      table.string("collector_name");
      table.boolean("latest").defaultTo(false).notNullable();
      table.boolean("verified").defaultTo(false);
      table.integer("new_boys").defaultTo(0);
      table.integer("new_girls").defaultTo(0);
      table.integer("attended_girls").defaultTo(0);
      table.integer("attended_boys").defaultTo(0);
      table.integer("actual_girls").defaultTo(0);
      table.integer("actual_boys").defaultTo(0);
      table.integer("prev_registered_girls").defaultTo(0);
      table.integer("prev_registered_boys").defaultTo(0);
      table.integer("abandoned_boys").defaultTo(0);
      table.integer("abandoned_girls").defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("general_records");
  }
}

module.exports = GeneralRecordSchema;
