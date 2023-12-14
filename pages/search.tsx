import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getInitialPokemonData } from "@/app/reducers/getInitialPokemonData";
import { getPokemonsData } from "@/app/reducers/getPokemonData";
import Loader from "@/components/Loader";
import PokemonCardGrid from "@/components/PokemonCardGrid";
import PageLayout from "@/sections/PageLayout";
import { debounce } from "@/utils";
import { Input, InputAdornment } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const handleChange = debounce((value: string) => getPokemon(value), 300);
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      const shuffledPokemons = clonedPokemons.sort(() => 0.5 - Math.random());
      const randomPokemonsId = shuffledPokemons.slice(0, 20);

      dispatch(getPokemonsData(randomPokemonsId));
    }
  }, [allPokemon, dispatch]);

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonsData(pokemons!));
    } else {
      const clonedPokemons = [...(allPokemon as [])];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 40);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  };

  return (
    <PageLayout pageTitle="Search">
      <div className="content ">
        <div className="search flex flex-col">
          <Input
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search the pokemon by name"
            id="input-with-icon-adornment"
            className="mb-3"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          {randomPokemons ? (
            <PokemonCardGrid pokemons={randomPokemons!} />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Search;
