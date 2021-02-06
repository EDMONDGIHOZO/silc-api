"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GeneralRecordSchema extends Schema {
  up() {
    this.create("general_records", (table) => {
      table.increments();
      table.date("collection_date").notNullable();
      table.date("date_debut_epargne_cycle").notNullable();
      table.date("date_probable_fin_epargne_cycle").notNullable();
      table.integer("dure_maximale_convenue_credit").notNullable();
      table.integer("group_id").notNullable();
      table.integer("inscrit_mois_precedent_gils").defaultTo(0);
      table.integer("inscrit_mois_precedent_boys").defaultTo(0);
      table.integer("abandons_mois_actuel_gils").defaultTo(0);
      table.integer("abandons_mois_actuel_boys").defaultTo(0);
      table.integer("nuveaux_membres_mois_girls").defaultTo(0);
      table.integer("nuveaux_membres_mois_boys").defaultTo(0);
      table.integer("membres_actuel_inscrits_girls").defaultTo(0);
      table.integer("membres_actuel_inscrits_boys").defaultTo(0);
      table.integer("membres_present_en_reunion_girls").defaultTo(0);
      table.integer("membres_present_en_reunion_boys").defaultTo(0);
      table.string("collector_name");
      table.boolean("latest").defaultTo(false).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("general_records");
  }
}

module.exports = GeneralRecordSchema;
