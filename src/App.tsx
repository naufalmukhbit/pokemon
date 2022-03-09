/** @jsxImportSource @emotion/react */
import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';

import PokemonList from './pages/pokemonList';
import PokemonDetail from './pages/pokemonDetail';
import MyPokemon from './pages/myPokemon';
import { css } from '@emotion/react';

function App() {
  const breakpoints = [320, 576, 768, 992, 1200];
  const mq = breakpoints.map((width) => `@media (min-width: ${width}px)`);

  return (
    <div className="App">
      <Header />
      <div css={css({
        padding: "0 0.5rem 3rem",
        margin: "auto",
        [mq[2]]: {
          maxWidth: breakpoints[2],
        }
      })}>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="pokemon/:pokemonName" element={<PokemonDetail />} />
          <Route path="my-pokemon" element={<MyPokemon />} />
          <Route path="test" element={<h1>TEST</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
