import { db } from "@/lib/drizzle";
import { votes } from "@/backend/schema";

export async function getVotesAPI() {
  const res = await db.select().from(votes);
  return res.sort((a, b) => {
    if (a.votes === null && b.votes === null) {
      return 0;
    } else if (a.votes === null) {
      return 1;
    } else if (b.votes === null) {
      return -1;
    } else {
      return b.votes - a.votes;
    }
  });
}
