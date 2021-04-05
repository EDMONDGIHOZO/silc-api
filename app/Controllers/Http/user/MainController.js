"use strict";

const User = use("App/Models/User");
const SpreadSheet = use("SpreadSheet");

class MainController {
  /** -================== show all users from database ======================= */
  async index({ response }) {
    /** get all the users */
    const users = await User.query()
      .with("role")
      .withCount("collections")
      .fetch();
    if (users.length === 0) {
      response.status(200).send({
        message: "no users in db yet",
      });
    }

    return response.status(200).send({
      message: "found users",
      data: users,
    });
  }

  /** ==============show single user details =================================*/

  async show({ params, response }) {
    /** get single usr from database by id */

    const user = await User.query()
      .where("id", params.id)
      .withCount("collections as total_collections")
      .first();

    if (!user) {
      return response.status(404).send({
        message: "not found",
      });
    }

    return response.status(200).send({
      message: "success",
      data: user,
    });
  }

  /*** get the current user information */
  async profile({ auth, response }) {
    const currentUser = await auth.getUser();
    if (currentUser) {
      const user = await User.query()
        .where("id", currentUser.id)
        .with("role")
        .withCount("collections as total_collections")
        .first();
      return response.status(200).send({
        message: "success",
        data: user,
      });
    } else {
      return response.status(404).send({
        message: "notFound",
      });
    }
  }

  /*** ============= update single user data ================================ */

  async update({ request, params, response }) {
    /*** get the user update inputs  */
    let { status } = request.only(["status"]);

    /** get the target user */
    try {
      const user = await User.query().where("id", params.id).first();
      if (!user) {
        return response.status(404).send({
          message: "not found",
        });
      }

      /** update the user details */

      user.active = status;
      await user.save();
      return response.status(200).send({
        message: "info updated",
      });
    } catch (error) {
      return response.status(404).send({
        message: "fail",
        error: error,
      });
    }
  }

  /********** update the user password ===============================*/
  async reset({ request, params, response }) {
    /*** get the user update inputs  */
    let { password } = request.only(["password"]);

    /** get the target user */
    try {
      const user = await User.query().where("id", params.id).first();
      if (!user) {
        return response.status(404).send({
          message: "not found",
        });
      }
      /** update the user details */
      user.email = password;
      await user.save();

      return response.status(200).send({
        message: "password  updated",
      });
    } catch (error) {
      return response.status(404).send({
        message: "fail",
        error: error,
      });
    }
  }

  /** ------------------------------- Delete user from database ------------- */

  async delete({ params, response }) {
    /*** get the user from db */
    const user = await User.query().where("id", params.id).first();
    if (!user) {
      return response.status(404).send({
        message: "not found",
      });
    }
    /** delete the user  */
    await user.delete();

    return response.status(200).send({
      message: "user removed from database",
    });
  }

  // download the excel
  async download({ params, response }) {
    const ss = new SpreadSheet(response, params.format);
    const users = await User.all();
    const data = [];

    data.push(["id", "First Name", "email", "user name"]);
    users.toJSON().forEach((user) => {
      data.push([user.id, user.firstname, user.email, user.username]);
    });

    ss.addSheet("Users", data);
    ss.download("Silc Users");
  }
}

module.exports = MainController;
