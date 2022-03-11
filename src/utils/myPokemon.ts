type pokemon = {
  name: string;
  image: string;
  moves: string[];
  types: string[];
};

const getPokemonFromLocalStorage = () => {
  let savedPokemon = localStorage.getItem("my-pokemon");
  let currentPokemon = savedPokemon ? JSON.parse(savedPokemon) : [];

  let ownedPokemon = localStorage.getItem("my-owned");
  let currentOwnedPokemon: any = ownedPokemon ? JSON.parse(ownedPokemon) : {};

  let pokemonNames = localStorage.getItem("my-pokemon-names");
  let currentPokemonNames = pokemonNames ? JSON.parse(pokemonNames) : [];

  return {
    myPokemon: currentPokemon,
    myPokemonAmount: currentOwnedPokemon,
    myPokemonNicknames: currentPokemonNames,
  };
};

export const savePokemon = (pokemon: pokemon, nickname: string) => {
  let { myPokemon, myPokemonAmount, myPokemonNicknames } =
    getPokemonFromLocalStorage();

  if (
    !myPokemonNicknames
      .map((item: string) => item.toLowerCase())
      .includes(nickname.toLowerCase())
  ) {
    let newPokemon = [
      ...myPokemon,
      {
        name: pokemon.name,
        imageURL: pokemon.image,
        nickname: nickname,
      },
    ];

    localStorage.setItem("my-pokemon", JSON.stringify(newPokemon));

    myPokemonAmount[pokemon.name] = myPokemonAmount[pokemon.name]
      ? myPokemonAmount[pokemon.name] + 1
      : 1;

    localStorage.setItem("my-owned", JSON.stringify(myPokemonAmount));
    localStorage.setItem(
      "my-pokemon-names",
      JSON.stringify([...myPokemonNicknames, nickname])
    );

    return true;
  } else {
    return false;
  }
};

export const releasePokemon = (nickname: string) => {
  let { myPokemon, myPokemonAmount, myPokemonNicknames } =
    getPokemonFromLocalStorage();

  if (
    myPokemonNicknames
      .map((item: string) => item.toLowerCase())
      .includes(nickname.toLowerCase())
  ) {
    let pokemonIndex = myPokemonNicknames.indexOf(nickname);
    let pokemonName = myPokemon[pokemonIndex].name;

    myPokemon.splice(pokemonIndex, 1);
    myPokemonNicknames.splice(pokemonIndex, 1);

    localStorage.setItem("my-pokemon", JSON.stringify(myPokemon));

    myPokemonAmount[pokemonName] = myPokemonAmount[pokemonName] - 1;
    myPokemonAmount[pokemonName] === 0 && delete myPokemonAmount[pokemonName];

    localStorage.setItem("my-owned", JSON.stringify(myPokemonAmount));
    localStorage.setItem("my-pokemon-names", JSON.stringify(myPokemonNicknames));
  }
};
