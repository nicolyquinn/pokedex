//@ts-nocheck

import { pokemonTypeInterface, userPokemonsType } from "@/utils/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "@/app/hooks";
import { addPokemonToList } from "@/app/reducers/addPokemonToList";
import { removePokemonFromUserList } from "@/app/reducers/removePokemonFromUserList";
import { toast } from "react-toastify";
import { setPokemonTab } from "@/app/slices/AppSlice";
import { pokemonTabs } from "@/utils/Constants";
import { setCurrentPokemon } from "@/app/slices/PokemonSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddPokemon = async (data: any) => {
    try {
      const result = await dispatch(addPokemonToList(data));

      if ("error" in result.payload) {
        alert(result.payload.error);
      } else {
        alert(
          result.payload.success || `${data.name} added to your collection`
        );
      }
    } catch (error) {
      toast.error("Unknown error");
    }
  };

  return (
    <div className="max-h-[78vh] overflow-y-scroll overflow-x-hidden">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 m-4 mt-4">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonsType) => {
            return (
              <div
                className="bg-neutral-50 py-5 px-3 rounded-md flex flex-col justify-center items-center"
                key={data.id}
              >
                <div className="flex w-full justify-between">
                  <p className="text-xs">Nº {data.id}</p>
                  <div>
                    {router.asPath === "/search" ||
                    router.asPath === "/pokemon" ? (
                      <FavoriteBorderIcon
                        className="cursor-pointer"
                        onClick={() => handleAddPokemon(data)}
                      />
                    ) : (
                      <FavoriteIcon
                        className="cursor-pointer"
                        onClick={async () => {
                          await dispatch(
                            removePokemonFromUserList({ id: data.firebaseId! })
                          );
                          alert(`${data.name} removed successfully.`);
                        }}
                      />
                    )}
                  </div>
                </div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <Image
                  src={data.image}
                  alt="pokemon image"
                  className="pokemon-card-image cursor-pointer"
                  height={160}
                  width={160}
                  onClick={() => {
                    dispatch(setPokemonTab(pokemonTabs.description));
                    dispatch(setCurrentPokemon(undefined));
                    router.push(`/pokemon/${data.id}`);
                  }}
                />
                <div className="pokemon-card-types flex gap-2">
                  {data.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);
                      return (
                        <div
                          className="flex flex-col justify-center items-center"
                          key={index}
                        >
                          <Image
                            height={32}
                            width={32}
                            src={type[keys[0]].image}
                            alt="pokemon type"
                            className="pokemon-card-types-type-image"
                            loading="lazy"
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;
