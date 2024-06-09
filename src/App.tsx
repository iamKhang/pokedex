import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { Detail, Pokemon } from './interface';

interface Pokemons {
  name: string;
  url: string;
}




const App:React.FC = ()  => {

  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [viewDetail, setViewDetail] = React.useState<Detail>(
    {
      id: 0,
      isOpened: false
  }
  )

  useEffect(() => {
    const getPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
      setNextUrl(response.data.next);
      // setPokemon(response.data.results);
      const promises = response.data.results.map(async (pokemon: Pokemons) => { 
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);  
        console.log(poke.data); 
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
      });
  
      // Wait for all promises to resolve
      await Promise.all(promises);
    }
  
    getPokemon();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);  
    res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons((p) => [...p, poke.data]);
        setLoading(false);
    });
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">
          <h1>Pokémon</h1>  
        </header>

        <PokemonCollection  pokemons = {pokemons} viewDetail={viewDetail} setDetail={setViewDetail} />

        <div className="btn"  >
          <button onClick={loadMore}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
