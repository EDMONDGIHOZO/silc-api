"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParoisseSchema extends Schema {
  up() {
    this.create("paroisses", (table) => {
      table.increments();
      table.string("name").unique().notNullable();
      table.integer("diocese_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("paroisses");
  }
}

module.exports = ParoisseSchema;
