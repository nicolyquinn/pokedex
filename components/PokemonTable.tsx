import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getInitialPokemonData } from "@/app/reducers/getInitialPokemonData";
import { getPokemonsData } from "@/app/reducers/getPokemonData";
import Loader from "./Loader";
import Image from "next/image";
import { pokemonTypeInterface, userPokemonsType } from "@/utils/Types";
import { useRouter } from "next/router";
import LoupeIcon from "@mui/icons-material/Loupe";

export default function PokemonTable() {
  const dispatch = useAppDispatch();
  const { allPokemon } = useAppSelector(({ pokemon }) => pokemon);
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const [sortedPokemons, setSortedPokemons] = useState<userPokemonsType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 25;
  const tableRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    dispatch(getInitialPokemonData()).then((response: any) => {
      const totalPokemons = response.payload.length;
      setTotalPages(Math.ceil(totalPokemons / pageSize));
      setTotalPokemons(totalPokemons);
    });
  }, [dispatch, pageSize]);

  useEffect(() => {
    if (allPokemon) {
      const currentPagePokemons = allPokemon.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      );

      dispatch(getPokemonsData(currentPagePokemons)).then((response: any) => {
        setIsLoading(true);
        setSortedPokemons(response.payload);
        setIsLoading(false);
      });
    }
  }, [allPokemon, currentPage, dispatch, pageSize]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo(0, 0); // Rola para o topo quando houver uma mudança de página
    }
  }, [currentPage]);

  const handleChangePage = (_: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="h-fit w-full bg-white">
      {sortedPokemons.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            className="h-[50vh] overflow-scroll bg-white"
            ref={tableRef}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell className="tableHead">ID</TableCell>
                  <TableCell className="tableHead">Image</TableCell>
                  <TableCell className="tableHead">Name</TableCell>
                  <TableCell className="tableHead">Types</TableCell>
                  <TableCell className="tableHead">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPokemons.map((pokemon: userPokemonsType) => (
                  <TableRow key={pokemon.id}>
                    {!isLoading ? (
                      <>
                        <TableCell className="h-8">{pokemon.id}</TableCell>
                        <TableCell className="h-8 p-0 m-0">
                          <Image
                            src={pokemon.image}
                            alt={pokemon.name}
                            height={64}
                            width={64}
                          />
                        </TableCell>
                        <TableCell size="medium">{pokemon.name}</TableCell>
                        <TableCell className="flex gap-4 h-14">
                          {pokemon.types.map(
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
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            className="button"
                            onClick={() => {
                              router.push(`/pokemon/${pokemon.id}`);
                            }}
                          >
                            <LoupeIcon />
                            See details
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <Loader />
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="bg-teal-100"
            rowsPerPageOptions={[]}
            component="div"
            count={totalPokemons}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
