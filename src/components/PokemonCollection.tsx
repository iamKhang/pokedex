import React, { useEffect, useState } from "react";
import Pokedex from "pokedex-promise-v2";
import attackIcon from "../resources/icons/stats/attack.png";
import hpIcon from "../resources/icons/stats/hp.png";
import defenseIcon from "../resources/icons/stats/defense.png";
import specialAttackIcon from "../resources/icons/stats/special-attack.png";
import specialDefenseIcon from "../resources/icons/stats/special-defense.png";
import speedIcon from "../resources/icons/stats/speed.png";

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
      const response = await P.getPokemonsList({ limit: 24, offset: 0 });
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
      limit: 18,
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

  function getIconStat(statName: string) {
    switch (statName) {
      case "hp":
        return hpIcon;
      case "attack":
        return attackIcon;
      case "defense":
        return defenseIcon;
      case "special-attack":
        return specialAttackIcon;
      case "special-defense":
        return specialDefenseIcon;
      case "speed":
        return speedIcon;
      default:
        return; // return a default icon in case statName doesn't match any case
    }
  }

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
                <div className="col-12 d-flex justify-content-center">
                  <div className="pokemon-image-container">
                    {pokemon.imageDefault && (
                      <img
                        src={pokemon.imageDefault}
                        alt={pokemon.name}
                        className="img-fluid w-200 pokemon-image-default drop-shadow"
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

              <div className="row card-stats no-gutters p-2">
                <div className="col-12 bg-dark text-white text-center mb-1 stat-title">
                  Chỉ số
                </div>
                {pokemon.stats.map((stat, index) => (
                  <div
                    className="col-4 p-0 d-flex align-items-center"
                    key={index}
                  >
                    <img
                      src={getIconStat(stat.name)}
                      alt={stat.name}
                      className="img-fluid icon-small"
                    />
                    {stat.stat_base}
                  </div>
                ))}
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
