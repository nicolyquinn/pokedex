import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getUserPokemons } from "@/app/reducers/getUserPokemons";
import PokemonCardGrid from "@/components/PokemonCardGrid";
import PageLayout from "@/sections/PageLayout";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PokeballIcon from "@/public/assets/pokeball-icon.png";
import Image from "next/image";

function MyList() {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfo, dispatch]);
  const router = useRouter();

  return (
    <PageLayout pageTitle="My List">
      <div className="content flex justify-center items-center">
        {userInfo ? (
          <PokemonCardGrid pokemons={userPokemons} />
        ) : (
          <div className="flex flex-col gap-4">
            <Typography className="font-bold">
              You dont have any pokemon, go catch them!!
            </Typography>
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                router.push("/search");
              }}
            >
              <Image
                src={PokeballIcon}
                alt="pokeball icon"
                height={32}
                width={32}
              />
              Catch Pokemons
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default MyList;
