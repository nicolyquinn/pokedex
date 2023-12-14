import fetchPokemonDetails from "./fetchPokemonDetails";

// Função para obter detalhes de um lote de Pokémon
export const getPokemonBatchDetails = async (offset: number, limit: number) => {
  const batchDetails: any[] = [];
  try {
    for (let i = offset; i < offset + limit; i++) {
      const pokemonDetails = await fetchPokemonDetails(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      batchDetails.push(pokemonDetails);
    }
  } catch (error) {
    console.error("Error fetching Pokémon batch details:", error);
  }
  return batchDetails;
};

// Exemplo de uso: buscando detalhes dos Pokémon em lotes de 100
export const fetchPokemonBatch = async (
  offset: number,
  limit: number
): Promise<any[]> => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Não foi possível buscar os dados dos Pokémon");
    }

    const data = await response.json();
    const pokemonURLs = data.results.map((pokemon: any) => pokemon.url);

    const pokemonDetailsPromises = pokemonURLs.map(async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Não foi possível buscar os detalhes do Pokémon");
      }
      return response.json();
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    return pokemonDetails;
  } catch (error) {
    console.error("Erro ao buscar os detalhes dos Pokémon:", error);
    return [];
  }
};
