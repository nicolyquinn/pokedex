import { pokemonsRoute } from "@/utils/Constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const { data } = await axios.get(pokemonsRoute);
      return data.results;
    } catch (err) {
      console.error(err);
    }
  }
);
