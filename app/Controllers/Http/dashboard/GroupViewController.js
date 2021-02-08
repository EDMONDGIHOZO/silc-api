const Group = use("App/Models/specialModels/Group");
const Collection = use("App/Models/specialModels/Collection");

class GroupViewController {
  async show({ response, params }) {
    const group = await Group.query()
      .where("id", params.id)
      .with("diocese")
      .with("paroisse")
      .with("collections", (builder) => {
        builder.orderBy("created_at", "asc");
      })
      .first();
    return response.status(200).send({
      status: "success",
      message: "found",
      data: group,
    });
  }
}

module.exports = GroupViewController;
