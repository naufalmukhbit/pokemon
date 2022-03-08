import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const params = useParams();
  return (
    <h1>Pokemon Detail {params.pokemonName}</h1>
  )
}

export default PokemonDetail;