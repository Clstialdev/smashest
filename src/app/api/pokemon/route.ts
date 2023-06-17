import { PokemonClient } from "pokenode-ts";

export async function getPokemonsAPI() {
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

  const randomInt1 = Math.floor(Math.random() * 496);
  const randomInt2 = Math.floor(Math.random() * 496);

  const choices = [formattedPokemon[randomInt1], formattedPokemon[randomInt2]];

  console.log(choices);

  return choices;
}
