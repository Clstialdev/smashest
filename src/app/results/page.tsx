/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from "next/image";
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

export default async function HomePage() {
  const Votes = await getVotesAPI();

  return (
    <main className="h-fit w-full justify-center bg-neutral">
      <header className="flex h-[90px] w-full justify-between p-8">
        <h1 className="text-2xl font-bold">SMASHEST</h1>
        <Link href="/">
          <button className="btn">Vote</button>
        </Link>
      </header>

      <div className="mt-12 overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th>Image</th>
              <th>Id</th>
              <th>Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {Votes &&
              Votes.map((pokemon, index) => (
                <tr key={index}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle ">
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                          width={150}
                          height={150}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name}</td>
                  <td>{pokemon.votes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
