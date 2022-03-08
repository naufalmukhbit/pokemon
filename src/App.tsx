import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';

import PokemonList from './pages/pokemonList';
import PokemonDetail from './pages/pokemonDetail';
import MyPokemon from './pages/myPokemon';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="pokemon/:pokemonName" element={<PokemonDetail />} />
        <Route path="my-pokemon" element={<MyPokemon />} />
        <Route path="test" element={<h1>TEST</h1>} />
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
