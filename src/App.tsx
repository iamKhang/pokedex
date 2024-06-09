import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';

const App:React.FC = ()  => {
  return (
    <div className="App">
      <header className="App-header d-flex justify-content-center align-items-center">
        <img src={process.env.PUBLIC_URL + '/pokemon-svgrepo-com.svg'} alt="" />
      </header>

      <PokemonCollection />
    </div>
  );
}

export default App;