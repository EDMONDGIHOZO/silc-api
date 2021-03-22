"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
// credit internes
const Schema = use("Schema");

class CreditSchema extends Schema {
  up() {
    this.create("credits", (table) => {
      table.increments();
      table.integer("collection_id").unsigned().notNullable();
      table.integer("credite_girls").defaultTo(0);
      table.integer("credite_boys").defaultTo(0);
      table.integer("granted_credit").defaultTo(0);
      table.integer("granted_capital ").defaultTo(0);
      table.integer("interest_for_grants").defaultTo(0);
      table.integer("moyenne_amount_credit").defaultTo(0);
      table.integer("capital_interest").defaultTo(0);
      table.integer("rebursed_value_capital").defaultTo(0);
      table.integer("rebursed_interest_value").defaultTo(0);
      table.integer("rebursed_capital_interest").defaultTo(0);
      table.integer("remaining_credit_capital").defaultTo(0);
      table.integer("interest_remaining_credit").defaultTo(0);
      table.integer("credit_capital_interest_remaining").defaultTo(0);
      table.integer("capital_credit_remaining").defaultTo(0);
      table.integer("risky").defaultTo(0);
    });
  }

  down() {
    this.drop("credits");
  }
}

module.exports = CreditSchema;
