import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FeaturedSong from "./Featuredsong";
import TopArtists from "./TopArtists";
import MusicPlayer from "./MusicPlayer";

const TopArtistsExpd = () => {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="flex overflow-y-scroll scrollbar-hide">
        <Sidebar />
        <div className="bg-gray-900 ml-[16vw] pl-[1vw] w-full mt-[4.5rem] overflow-y-scroll scrollbar-hide">
          <FeaturedSong />
          <div className="flex gap-2">
            <TopArtists />
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopArtistsExpd;
