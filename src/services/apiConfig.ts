import { ApolloClient, InMemoryCache } from "@apollo/client";

const BASE_URL_SPRITES =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app",
  cache: new InMemoryCache(),
});

export { BASE_URL_SPRITES, client };
