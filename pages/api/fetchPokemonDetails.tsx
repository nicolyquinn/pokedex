const fetchPokemonDetails = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao obter detalhes do Pokémon");
    }
    const pokemonDetails = await response.json();

    return pokemonDetails;
    // Faça o que deseja com os detalhes do Pokémon, talvez armazenar em um estado ou exibir na tela
  } catch (error) {
    console.error("Erro ao obter detalhes do Pokémon:", error);
  }
};

export default fetchPokemonDetails;
