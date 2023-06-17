import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const votes = pgTable("votes", {
  id: integer("id").primaryKey(),
  name: text("name"),
  votes: integer("votes").default(0),
});
