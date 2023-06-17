import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { votes } from "@/backend/schema";

export async function GET() {
  const connectionString = process.env.DATABASE_URL;
  const client = postgres(connectionString as string);
  const db = drizzle(client);

  const Votes = await db.select().from(votes);

  return NextResponse.json({ result: Votes });
}
