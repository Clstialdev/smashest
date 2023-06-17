import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { votes } from "@/backend/schema";

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString as string);
export const db = drizzle(client);
