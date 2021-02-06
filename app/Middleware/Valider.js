"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validate } = use("Validator");
const Database = use('Database')

class Valider {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // common validation rules
    const rules = {
      email: "required|email|unique:users,email",
      username: "required|unique:users,username",
      password: 'required|min:4',
    };
    // do the validation
    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.send({
        status: "danger",
        data: validation.messages(),
      });
    }
    await next();
  }
}

module.exports = Valider;
