import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "/home/renato/NextjsDev/flexhire-challenge/src/db/dev.sqlite3",
    },
    debug: true,
    useNullAsDefault: true,
  },
};

export default config;
