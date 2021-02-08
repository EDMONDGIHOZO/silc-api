"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Solde extends Model {
  static get table() {
    return "soldes";
  }

  static get updatedAtColumn() {
    return null;
  }

  static get createdAtColumn() {
    return null;
  }

  static get primaryKey() {
    return "id";
  }
}

module.exports = Solde;
