'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entraide extends Model {

  static get table (){
    return "entraides"
  }

}

module.exports = Entraide
