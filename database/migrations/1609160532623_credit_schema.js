"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
// credit internes
const Schema = use("Schema");

class CreditSchema extends Schema {
  up() {
    this.create("credits", (table) => {
      table.increments();
      table.integer("collection_id").unsigned().notNullable().unique();
      table.integer("membres_contracte_un_credit_girls").defaultTo(0);
      table.integer("membres_contracte_un_credit_boys").defaultTo(0);
      table.integer("nombres_total_credit_actroyes").defaultTo(0);
      table.integer("valeur_de_credit_actroyes_capital").defaultTo(0);
      table.integer("valeur_des_interets_sur_credit_actroyes").defaultTo(0)
    });
  }

  down() {
    this.drop("credits");
  }
}

module.exports = CreditSchema;
