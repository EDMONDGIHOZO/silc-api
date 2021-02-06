"use strict";

const moment = require("moment");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Group extends Model {
  static get table() {
    return "groupes";
  }

  static get primaryKey() {
    return "id";
  }

  collections() {
    return this.hasMany("App/Models/specialModels/Collection", "id", "group_id");
  }

  diocese() {
    return this.belongsTo("App/Models/diocese", "diocese_id", "id");
  }

  paroisse() {
    return this.belongsTo("App/Models/paroisse", "paroisse_id", "id");
  }



}

module.exports = Group;
