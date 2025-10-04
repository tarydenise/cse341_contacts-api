const routes = require("express").Router();
const { home, professional } = require("../controllers/backendcontroller");

routes.get("/", home);
routes.get("/professional", professional);

module.exports = routes;
