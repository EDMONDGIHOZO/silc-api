'use strict'

const User = use('App/Models/User')

class LoginController {
  async login({ request, auth, response }) {
    try {
      // validate the user credentials and generate a JWT token
      const token = await auth.withRefreshToken().attempt(
        request.input("email"),
        request.input("password")
      );

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      response.send({
        status: "error",
        message: "Invalid email/password",
      });
    }
  }
}

module.exports = LoginController
