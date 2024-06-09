import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();

interface ListPokemon {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  imageDefault: string | null; // Allow null values
  imageShiny: string | null; // Allow null values
  stats: {
    stat_base: number;
    name: string;
  }[];
}

const PokemonCollection = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await P.getPokemonsList({ limit: 10, offset: 0 });
      const listPokemon: ListPokemon[] = response.results;
      const pokemonData = await Promise.all(
        listPokemon.map(async (pokemon) => {
          const data = await P.getPokemonByName(pokemon.name);
          console.log(data);
          return {
            name: data.name,
            id: data.id,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type) => type.type.name),
            abilities: data.abilities.map((ability) => ability.ability.name),
            imageDefault: data.sprites.front_default,
            imageShiny: data.sprites.front_shiny,
            stats: data.stats.map((stat) => ({
              stat_base: stat.base_stat,
              name: stat.stat.name,
            })),
          };
        })
      );

      setPokemons(pokemonData);
    };

    fetchPokemons();

    setIsLoading(false);
  }, []);

  const loadMore = async () => {
    setIsLoading(true);
    const response = await P.getPokemonsList({
      limit: 10,
      offset: pokemons.length,
    });

    const listPokemon: ListPokemon[] = response.results;

    const pokemonData = await Promise.all(
      listPokemon.map(async (pokemon) => {
        const data = await P.getPokemonByName(pokemon.name);
        return {
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => type.type.name),
          abilities: data.abilities.map((ability) => ability.ability.name),
          imageDefault: data.sprites.front_default,
          imageShiny: data.sprites.front_shiny,
          stats: data.stats.map((stat) => ({
            stat_base: stat.base_stat,
            name: stat.stat.name,
          })),
        };
      })
    );

    setPokemons([...pokemons, ...pokemonData]);
    setIsLoading(false);
  };

  return (
    <div>
      {/* Search */}
      {/* Search */}
      <div className="d-flex justify-content-start items-center mt-4 mb-4 w-100 ">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokemon"
        />
        <button
          className="btn btn-primary px-4 ml-2 py-3 
        "
        >
          Search
        </button>
      </div>
      <div className="row">
        {pokemons.map((pokemon) => (
          <div className="col-md-2 pokemon-cart" key={pokemon.id}>
            <div className="card mb-4 card-body">
              <div className="row d-flex justify-content-center">
                <div className="col-6 d-flex justify-content-center">
                  <div className="pokemon-image-container">
                    {pokemon.imageDefault && (
                      <img
                        src={pokemon.imageDefault}
                        alt={pokemon.name}
                        className="img-fluid w-100 pokemon-image-default drop-shadow"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                </div>
              </div>

              <div className="d-flex items-start">
                {pokemon.types.map((type, index) => (
                  <div className="p-2" key={index}>
                    <span className={`badge ${type}`}>{type}</span>
                  </div>
                ))}
              </div>

              <div className="card-stats">
                <div className="row">
                  {pokemon.stats.map((stat, index) => (
                    <div className="col-4" key={index}>
                      {stat.name} : {stat.stat_base}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="d-flex justify-content-center mt-4 mb-4 w-100
      "
      >
        <button className="btn" onClick={loadMore}>
          {isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Load More"
          )}
        </button>
      </div>
    </div>
  );
};

export default PokemonCollection;
