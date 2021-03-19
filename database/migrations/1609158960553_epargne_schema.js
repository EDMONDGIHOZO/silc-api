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
      table.integer("period_released_amount").defaultTo(0);
      table.integer("monthly_min_amount").defaultTo(0);
      table.integer("monthly_max_amount").defaultTo(0);
      table.integer("epargne_per_member").defaultTo(0);
    });
  }

  down() {
    this.drop("epargnes");
  }
}

module.exports = EpargneSchema;
