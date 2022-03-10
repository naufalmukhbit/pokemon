/** @jsxImportSource @emotion/react */
import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';

import PokemonList from './pages/pokemonList';
import PokemonDetail from './pages/pokemonDetail';
import MyPokemon from './pages/myPokemon';
import PageNotFound from './pages/notFound';

function App() {
  const breakpoints = [320, 576, 768, 992, 1200];
  const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="pokemon/:pokemonName" element={<PokemonDetail />} />
        <Route path="my-pokemon" element={<MyPokemon />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
