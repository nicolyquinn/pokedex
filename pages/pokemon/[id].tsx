//@ts-nocheck

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLayout from "@/sections/PageLayout";
import Loader from "@/components/Loader";
import { pokemonRoute } from "@/utils/Constants";
import { pokemonStatsType, pokemonTypeInterface } from "@/utils/Types";
import { defaultImages, images, pokemonTypes } from "@/utils";
import Image from "next/image";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

function Pokemon() {
  const router = useRouter();
  const [data, setData] = useState<>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = pokemonRoute + "/" + router.query.id; // Certifique-se de definir pokemonRoute corretamente
        const response = await axios.get(url);

        const types = response.data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            [name]: pokemonTypes[name],
          })
        );
        let image: string = images[response.data.id];
        if (!image) {
          image = defaultImages[response.data.id];
        }

        const modifiedData = {
          ...response.data, // mantém os dados originais
          image, // adiciona a imagem ao objeto
          types, // adiciona os tipos ao objeto
        };

        console.log(modifiedData); // Verifique os dados modificados
        setData(modifiedData); // Define os dados modificados no estado
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [router.query.id]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#0d9488" : "#308fe8",
    },
  }));

  return (
    <PageLayout pageTitle="Pokemon Details">
      <div className="content w-fit">
        {data ? (
          <div className="bg-white rounded-lg p-4 bg-opacity-50 flex flex-col gap-4 justify-center items-center">
            <h1 className="name">{data?.name}</h1>
            <div className="bg-teal-300 rounded-lg w-fit">
              <Image
                src={data?.image}
                alt="pokemon image"
                className="pokemon-card-image"
                height={160}
                width={160}
              />
            </div>
            <div className="pokemon-card-types flex gap-4 justify-center items-center">
              {data.types.map((type: pokemonTypeInterface, index: number) => {
                const keys = Object.keys(type);
                return (
                  <div className="pokemon-card-types-type" key={index}>
                    <Image
                      height={48}
                      width={48}
                      src={type[keys[0]].image}
                      alt="pokemon type"
                      className="pokemon-card-types-type-image"
                      loading="lazy"
                    />
                    <h6 className="pokemon-card-types-type-text">{keys[0]}</h6>
                  </div>
                );
              })}
            </div>
            <div className="stats">
              <ul className="list-none">
                {data?.stats.map((stat: pokemonStatsType) => {
                  return (
                    <li
                      key={stat.stat.name}
                      className="flex flex-col justify-center"
                    >
                      <p>
                        <strong>{stat.stat.name}</strong>: {stat.base_stat}
                      </p>
                      <BorderLinearProgress
                        variant="determinate"
                        value={stat.base_stat}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </PageLayout>
  );
}

export default Pokemon;
