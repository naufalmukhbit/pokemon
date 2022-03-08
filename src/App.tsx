import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './pages/pokemonList';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
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
      <h1>Pokémon List</h1>
      <div>
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
