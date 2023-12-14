import React from "react";
import pokeballLoader from "@/public/assets/pokeball-loader.gif";
import Image from "next/image";
function Loader() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Image src={pokeballLoader} alt="" height={210} width={210} />
    </div>
  );
}

export default Loader;
