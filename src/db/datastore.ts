import knex from "knex";
import config from "./knexfile";

const datastore = knex(config["development"]);

export default datastore;
