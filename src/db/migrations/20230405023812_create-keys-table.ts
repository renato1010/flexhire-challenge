import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("keys", function (table: Knex.TableBuilder) {
    table.uuid("id", { primaryKey: true }).notNullable().unique();
    table.string("value").notNullable();
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("keys");
}
