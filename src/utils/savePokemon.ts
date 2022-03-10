type pokemon = {
  name: string;
  image: string;
  moves: string[];
  types: string[];
};
export const savePokemon = (pokemon: pokemon, nickname: string) => {
  let savedPokemon = localStorage.getItem("my-pokemon");
  let currentPokemon = savedPokemon ? JSON.parse(savedPokemon) : [];

  let newPokemon = [
    ...currentPokemon,
    {
      name: pokemon.name,
      imageURL: pokemon.image,
      nickname: nickname,
    }
  ];

  localStorage.setItem("my-pokemon", JSON.stringify(newPokemon));
}