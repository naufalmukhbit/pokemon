/** @jsxImportSource @emotion/react */
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/header";
import { CardListSkeleton, DetailSkeleton } from "./components/skeleton";

const PokemonList = lazy(() => import("./pages/pokemonList"));
const PokemonDetail = lazy(() => import("./pages/pokemonDetail"));
const MyPokemon = lazy(() => import("./pages/myPokemon"));
const PageNotFound = lazy(() => import("./pages/notFound"));

function App() {
  const { pathname } = useLocation();

  const fallback = (path: string) => {
    switch (path) {
      case "/":
        return <CardListSkeleton />;
      case "/my-pokemon":
        return <CardListSkeleton />;
      default:
        return <DetailSkeleton />;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <Suspense fallback={fallback(pathname)}>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="pokemon/:pokemonName" element={<PokemonDetail />} />
          <Route path="my-pokemon" element={<MyPokemon />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
