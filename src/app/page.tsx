/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from "next/image";
import { PokemonClient } from "pokenode-ts";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle";
import { votes } from "@/backend/schema";
import { sql } from "drizzle-orm";
import { getPokemonsAPI } from "./getPokemons";

export default async function HomePage() {
  const pokemons = (await getPokemonsAPI()) as Pokemon[];

  const updateVotes = async (formData: FormData) => {
    "use server";
    const pokemonId = formData.get("pokemonId");
    const pokenum = parseInt(pokemonId as string);
    const pokemonName = formData.get("pokemonName") as string;

    const update = await db
      .insert(votes)
      .values({
        id: pokenum,
        name: pokemonName,
        votes: 1,
      })
      .onConflictDoUpdate({
        target: votes.id,
        set: {
          name: pokemonName,
          votes: sql`${votes.votes} + 1`,
        },
      });

    revalidatePath("/");
  };

  return (
    <main className="h-screen w-full justify-center bg-neutral">
      <header className="flex h-[90px] w-full justify-between p-8">
        <h1 className="text-2xl font-bold">SMASHEST</h1>
        <Link href="/results">
          <button className="btn">Results</button>
        </Link>
      </header>

      {
        <div className="relative mt-16 grid grid-cols-2 justify-center px-[5%]">
          <div className="absolute top-1/2 w-full text-center text-5xl font-bold">
            Vs.
          </div>
          {pokemons &&
            pokemons.map((pokemon, index) => (
              <div key={index} className="flex w-full justify-center">
                <div className="card w-96 bg-base-200">
                  <figure>
                    <Image
                      src={pokemon.spriteUrl}
                      className="pixelated h-[420px]"
                      width={420}
                      height={420}
                      alt=""
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title capitalize text-primary-content">
                      {pokemon.name}
                    </h2>
                    <p className="text-primary-content">
                      Does this pokemon rock your boat?
                    </p>
                    <div className="card-actions mt-4 justify-end">
                      <form
                        action={updateVotes}
                        className="flex flex-col items-center"
                      >
                        <input
                          type="text"
                          name="pokemonId"
                          value={pokemon.id}
                          className="hidden"
                        />
                        <input
                          type="text"
                          name="pokemonName"
                          value={pokemon.name}
                          className="hidden"
                        />
                        <button
                          className="btn-primary btn-block btn text-[16px] font-semibold"
                          type="submit"
                        >
                          SMASH!
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
    </main>
  );
}
