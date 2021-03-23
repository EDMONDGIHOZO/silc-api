"use strict";

const { route } = require("@adonisjs/framework/src/Route/Manager");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "API ONLY" };
});

/** ============= Users management ================================ */
Route.group(() => {
  Route.post("register", "user/RegistrationController.store").middleware([
    "valider",
  ]);
  Route.post("login", "user/LoginController.login");
  Route.get("all", "user/MainController.index");
  Route.get("find/:id", "user/MainController.show");
  Route.put("edit/:id", "user/MainController.update");
  Route.put("reset/:id", "user/MainController.reset");
  Route.delete("delete/:id", "user/MainController.delete");
  Route.get("me", "user/MainController.profile").middleware(["auth"]);
}).prefix("user");

/** user roles **/
Route.group(() => {
  Route.resource("roles", "user/RoleController");
});

// penalities and entre aide
Route.post("penality", "hr/MainController.penCreate");
Route.put("penality", "hr/MainController.penUpdate");
Route.post("entraide", "hr/MainController.enCreate");
Route.put("entraide", "hr/MainController.enUpdate");

/**** Dioceses management */
Route.group(() => {
  Route.resource("dioceses", "dioceses/MainController").middleware(["auth"]);
});

Route.get("/diocesesAll", "dioceses/MainController.indexAll").middleware([
  "auth",
]);

/*** Paroisses management */
Route.group(() => {
  Route.resource("paroisses", "paroise/MainController");
});

/** les groupes sasa */
Route.group(() => {
  Route.post("groupes", "groupe/CreateController.store");
  Route.get("groupes", "groupe/ViewController.index");
  Route.get("groupes/:id", "groupe/ViewController.show");
  Route.put("groupes/:id", "groupe/MainController.update");
  Route.delete("groupes/:id", "groupe/MainController.destroy");
});

/** general data collection */

Route.group(() => {
  Route.resource("collections", "collection/GeneralController");
});
Route.group(() => {
  Route.resource("caisse", "CaisseController");
});

/** Epargne data collection  */
Route.group(() => {
  Route.resource("epargnes", "collection/EpargneController");
});


// special Viewgroup
Route.get("sgroup/:id", "dashboard/GroupViewController.show");

/** Credit data collection  */
Route.group(() => {
  Route.resource("credits", "collection/CreditController");
});


/** institution relation data collection  */
Route.group(() => {
  Route.resource("relations", "collection/RelationController");
});

/*** dashboard routes */

Route.group(() => {
  Route.get("groupeAll", "groupe/ViewController.indexAll");
  Route.get("diocese_paroisse_groupes", "dashboard/MainController.index");
  Route.get("dio-pars/:id", "dashboard/MainController.diopar");
  Route.get("aec", "dashboard/MainController.index2");
}).prefix("/api");
