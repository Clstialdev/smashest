"use client";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from "next/image";
import { PokemonClient } from "pokenode-ts";

type Pokemon = {
  id: number;
  name: string;
  spriteUrl: string;
};

async function getData() {
  const pokeApi = new PokemonClient();
  const allPokemon = await pokeApi.listPokemons(0, 493);

  const formattedPokemon = allPokemon.results.map((p, index: number) => ({
    id: index + 1,
    name: (p as { name: string }).name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  // Recommendation: handle errors
  if (!allPokemon) {
    throw new Error("Failed to fetch data");
  }

  return formattedPokemon as Pokemon[];
}

const getVotes = async () => {
  try {
    const votesRes = await fetch("/api/votes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!votesRes.ok) {
      throw new Error("Failed to fetch data!");
    }
    const votes = await votesRes.json();

    return votes as number[];
  } catch (error) {
    console.log(error);
  }
};

export default async function HomePage() {
  const data = await getData();
  const currentPokemons = [data[1], data[2]] as Pokemon[];

  const votes = await getVotes();

  console.log(votes);

  return (
    <main className="h-screen w-full justify-center bg-neutral">
      <header className="flex h-[90px] w-full justify-between p-8">
        <h1 className="text-2xl font-bold">SMASHEST</h1>
        <Link href="/results">
          <button className="btn">Results</button>
        </Link>
      </header>

      <div className="relative mt-16 grid grid-cols-2 justify-center px-[5%]">
        <div className="absolute top-1/2 w-full text-center text-5xl font-bold">
          Vs.
        </div>
        {currentPokemons.map((pokemon, index) => (
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
                  <button className="btn-primary btn-block btn text-[16px] font-semibold">
                    SMASH!
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
