import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { votes } from "@/backend/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  const Votes = await db.select().from(votes);

  return NextResponse.json({ result: "GET" });
}

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as {
    id: number;
    name: string;
  };

  const Votes = await db
    .insert(votes)
    .values({ id: reqBody.id, name: reqBody.name, votes: 1 })
    .onConflictDoUpdate({
      target: votes.id,
      set: { name: reqBody.name, votes: sql`${votes.votes} + 1` },
    });

  console.log(Votes);

  return NextResponse.json({ result: Votes });
}
