"use strict";

const User = use("App/Models/User");
const Database = use("Database");
const { validate } = use("Validator");

class RegistrationController {
  async store({ request, response }) {
    let {
      username,
      email,
      firstname,
      lastname,
      password,
      role_id,
    } = request.only([
      "username",
      "email",
      "firstname",
      "lastname",
      "password",
      "role_id",
    ]);
    /** fetch the default role for the user  */
    const user_role = await Database.from("roles")
      .where("name", "collector")
      .first();

    if (!user_role) {
      return response.status(404).send({
        message: "failed to get the user role",
      });
    }
    /** store the user to db */
    const user = await User.create({
      username: username,
      email: email,
      password: password,
      role_id: role_id,
      firstname: firstname,
      lastname: lastname,
    });

    return response.status(200).send({
      status: "success",
      message: "successfully created",
    });
  }
}

module.exports = RegistrationController;
