import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import FeaturedSong from "./Featuredsong";
import TopArtists from "./TopArtists";
import Genres from "./Genres";
import TopCharts from "./TopCharts";
import MusicPlayer from "./MusicPlayer";
import Albums from "./Albums";
import AdModal from "./AdModal";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.sessionStatus.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/signin", { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-gray-900">
      <AdModal />
      <NavBar />
      <div className="flex overflow-y-scroll scrollbar-hide">
        <Sidebar />
        <div className="bg-gray-900 ml-[16vw] pl-[1vw] w-full mt-[4.5rem] overflow-y-scroll scrollbar-hide">
          <FeaturedSong />
          <div className="flex gap-2">
            <div className="flex flex-col">
              <Albums />
              <div className="flex justify-between gap-2">
                <Genres />
                <TopCharts />
              </div>
              <TopArtists />
            </div>
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
