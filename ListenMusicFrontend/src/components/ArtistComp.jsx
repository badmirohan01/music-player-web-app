import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ArtistExpd from "./ArtistExpd";
import MusicPlayer from "./MusicPlayer";
import { useLocation } from "react-router";
import Tracks from "./Tracks";


const ArtistComp = () => {
  const location = useLocation();
  // console.log(location.pathname)
  const pathVariable = location.pathname.split("/")[1];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex overflow-y-scroll scrollbar-hide">
        <Sidebar />
        <div className="w-full h-full px-8 pt-4 pb-8 rounded-lg overflow-y-scroll scrollbar-hide ml-[15vw] mr-3 mt-[3.5rem]">
          <div className="flex gap-3 items-center">
          {pathVariable === "artists" && <ArtistExpd />}
          {pathVariable === "albums" && <Tracks />}
          <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistComp;

// className="w-[55vw] h-[37.1rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll scrollbar-hide mt-5 transition-all duration-500 ease-out"
