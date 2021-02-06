"use strict";
const moment = require("moment");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Groupe extends Model {
  collections() {
    return this.hasMany("App/Models/GeneralRecord", "id", "group_id");
  }

  diocese() {
    return this.belongsTo("App/Models/diocese", "diocese_id", "id");
  }

  paroisse() {
    return this.belongsTo("App/Models/paroisse", "paroisse_id", "id");
  }

  static get createdAtColumn() {
    null;
  }

  static get dates() {
    return super.dates.concat(["start_date", "end_date"]);
  }

  static castDates(field, value) {
    if (field === "start_date") {
      return moment(value).format("yyyy-MM-DD");
    } else if (field === "end_date") {
          return moment(value).format("yyyy-MM-DD");
    }
  }

  static get updatedAtColumn() {
    null;
  }
}

module.exports = Groupe;
