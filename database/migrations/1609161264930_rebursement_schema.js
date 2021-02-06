"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RebursementSchema extends Schema {
  up() {
    this.create("rebursements", (table) => {
      table.increments();
      table.integer("collection_id").notNullable().unique();
      table.integer("valeur_de_credit_rembourse_capital").defaultTo(0);
      table.integer("valeur_des_interets_sur_credit_rembourse").defaultTo(0);
      table
        .integer("valeur_des_credit_capital_restant_rembourse_fin")
        .defaultTo(0);
      table.integer("valeur_de_interets_credit_restant_rembourse").defaultTo(0);
      table.integer("valeur_des_credit_en_retard").defaultTo(0);
    });
  }

  down() {
    this.drop("rebursements");
  }
}

module.exports = RebursementSchema;
