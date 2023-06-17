"use client";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const getPokemons = async () => {
  try {
    const PokemonsRes = await fetch("/api/pokemon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!PokemonsRes.ok) {
      throw new Error("Failed to fetch data!");
    }
    const Pokemons = await PokemonsRes.json();

    return Pokemons as Pokemon[];
  } catch (error) {
    console.log(error);
  }
};

const handleVote = async (pokemon: Pokemon) => {
  try {
    const votesRes = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: pokemon.id, name: pokemon.name }),
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

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchData = async () => {
    try {
      const pokemonsRes = await fetch("/api/pokemon", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!pokemonsRes.ok) {
        throw new Error("Failed to fetch data!");
      }

      const pokemons = (await pokemonsRes.json()) as { result: Pokemon[] };
      console.log(pokemons.result);
      setPokemons(pokemons.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                      <button
                        className="btn-primary btn-block btn text-[16px] font-semibold"
                        onClick={async () => {
                          await handleVote(pokemon);
                          await fetchData();
                        }}
                      >
                        SMASH!
                      </button>
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
