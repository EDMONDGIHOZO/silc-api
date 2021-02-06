"use strict";

const moment = require("moment");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Collection extends Model {
  static get table() {
    return "general_records";
  }

  static get primaryKey() {
    return "id";
  }

  group() {
    return this.belongsTo("Models/specialModels/Group", "group_id", "id");
  }

  rebursed() {
    return this.hasOne("App/Models/Rebursement", "id", "collection_id");
  }
  relation() {
    return this.hasOne("App/Models/InstitutionRelation", "id", "collection_id");
  }

  epargne() {
    return this.hasOne("App/Models/Epargne", "id", "collection_id");
  }

  credit() {
    return this.hasOne("App/Models/Credit", "id", "collection_id");
  }



  static get dates() {
    return super.dates.concat(["created_at", "updated_at"]);
  }

  static castDates(field, value) {
    if (field === "created_at") {
      return moment(value).format("MM");
    } else if (field === "updated_at") {
          return moment(value).format("yyyy-MM-DD");
    }
  }

}

module.exports = Collection;
