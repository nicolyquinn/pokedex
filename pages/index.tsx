import PokemonTable from "@/components/PokemonTable";
import PageLayout from "@/sections/PageLayout";
import { Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <PageLayout pageTitle="Pokedex">
      <div className="content flex flex-col gap-3 bg-white rounded-lg p-4 bg-opacity-50">
        <Typography variant="h4">Pokedex</Typography>
        <div className="flex gap-4 lg:flex-row md:flex-row flex-col">
          <Button
            className="button"
            variant="contained"
            onClick={() => {
              router.push("/search");
            }}
          >
            <SearchIcon /> Search for Pokemons
          </Button>
          <Button
            className="button"
            variant="contained"
            onClick={() => {
              router.push("/my-list");
            }}
          >
            <SummarizeIcon />
            See My Collection
          </Button>
        </div>
        <Typography>Check below a list of all the Pokemons.</Typography>
        <PokemonTable />
      </div>
    </PageLayout>
  );
}

export default Home;
