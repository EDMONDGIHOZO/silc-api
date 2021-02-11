'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Penalite extends Model {

  static get table (){
    return "penalites"
  }

}


module.exports = Penalite
