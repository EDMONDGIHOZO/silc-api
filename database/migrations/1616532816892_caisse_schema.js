"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CaisseSchema extends Schema {
  up() {
    this.create("caisses", (table) => {
      table.increments();
      table.integer("collection_id").notNullable().unique();
      table.integer("rapport_sold").defaultTo(0);
      table.integer("epargne_entre").defaultTo(0);
      table.integer("credit_rembourse_capital_interest").defaultTo(0);
      table.integer("caisse_solidalite").defaultTo(0);
      table.integer("entre_penalite").defaultTo(0);
      table.integer("autre_entre").defaultTo(0);
      table.integer("total_entre").defaultTo(0);
      table.integer("sortie_credit_actroye").defaultTo(0);
      table.integer("autre_sortie").defaultTo(0);
      table.integer("total_sortie").defaultTo(0);
      table.integer("solde_periode").defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("caisses");
  }
}

module.exports = CaisseSchema;
