import React from 'react'
import { Detail, Pokemon, PokemonDetail } from '../interface';
import PokemonList from './PokemonList';
import './pokemon.css'


interface Props{
    pokemons: PokemonDetail[];
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection:React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setDetail } = props; 

    const selectPokemon = (id: number) => {

        if(!viewDetail.isOpened){
            setDetail({
                id: id,
                isOpened: true
            });
        }
       
    }
  return (
    <div>
       <section className={
            viewDetail.isOpened ? "colection-container-active" : "collection-container"
       }>
            {
                viewDetail.isOpened  ? (
                    <div className="overlay">
                        
                    </div>
                ):(
                    <div></div>
                )
            }
            {pokemons.map((pokemon) => {
                return (
                    <div onClick={  () => selectPokemon(pokemon.id)}>
                        <PokemonList
                            key={pokemon.id}
                            id={pokemon.id} 
                            name={pokemon.name}
                            abilities={pokemon.abilities}
                            image={pokemon.sprites.front_default}

                            viewDetail={viewDetail}
                            setDetail={setDetail}
                        />
                    </div>
                );
            })}
       </section>
    </div>
  )
}

export default PokemonCollection