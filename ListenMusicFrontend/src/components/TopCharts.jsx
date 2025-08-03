import React from "react";
import { useEffect } from "react";
import { MoreVertical, Play, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveState } from "../redux/Active/activeSlice";

import { Link } from "react-router";

const TopCharts = () => {
  const topChartsData = [
    {
      position: "01",
      song: "Havana",
      artist: "Camila Cabello",
      image: "/assets/TopCharts/Havana.jpeg",
    },
    {
      position: "02",
      song: "Jesus Is King",
      artist: "Kanye West",
      image: "/assets/TopCharts/Jesus is King.jpeg",
    },
    {
      position: "03",
      song: "Closer",
      artist: "The Chainsmokers",
      image: "/assets/TopCharts/Closer.jpeg",
    },
    {
      position: "04",
      song: "7 Rings",
      artist: "Ariana Grande",
      image: "/assets/TopCharts/7 Rings.jpeg",
    },
    {
      position: "05",
      song: "Sunflower",
      artist: "Post Malone",
      image: "/assets/TopCharts/Sunflower.jpeg",
    },
    {
      position: "06",
      song: "Blue Eyes",
      artist: "Yo Yo Honey Singh",
      image: "/assets/TopCharts/Blue eyes.jpeg",
    },
    {
      position: "07",
      song: "Sorry",
      artist: "Justin Bieber",
      image: "/assets/TopCharts/Sorry.jpeg",
    },
    {
      position: "08",
      song: "Photograph",
      artist: "Ed Sheeran",
      image: "/assets/TopCharts/Photograph.jpeg",
    },
    {
      position: "09",
      song: "Uptown Funk",
      artist: "Mark Ronson",
      image: "/assets/TopCharts/Uptown Funk.jpeg",
    },
    {
      position: "10",
      song: "Believer",
      artist: "Imagine Dragons",
      image: "/assets/TopCharts/Believer.jpeg",
    },
  ];

  const active = useSelector((state) => state.activeState.menuItem);
  const dispatch = useDispatch();

  return (
    <div
      className={
        active === "topcharts" && window.location.pathname === "/topcharts"
          ? "w-[55vw] h-[37rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll text-lg scrollbar-hide top-[8.5rem] left-[17vw] transition-all duration-500 ease-out mt-3 "
          : "px-8 pt-4 pb-8 bg-gray-800 rounded-lg w-[27.6vw] h-[46vh] overflow-hidden text-lg scrollbar-hide transition-all duration-500 ease-out "
      }
    >
      {active === "topcharts" && window.location.pathname === "/topcharts" ? (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Top Charts</h2>
          <Link to={"/"}>
            <X
              onClick={() => dispatch(setActiveState("explore"))}
              className="text-sm  text-gray-400 cursor-pointer hover:bg-gray-900 rounded-full p-1"
            ></X>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4  bg-gray-800 h-8">
          <h2 className="text-white text-lg font-medium">Top Charts</h2>
          <Link to={"/topcharts"}>
            <button
              onClick={() => dispatch(setActiveState("topcharts"))}
              className="text-sm text-gray-400 cursor-pointer"
            >
              See all
            </button>
          </Link>
        </div>
      )}

      <div>
        {topChartsData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center text-sm text-white hover:bg-gray-900 cursor-pointer rounded-lg p-1 transition duration-300 ease-in-out`}
          >
            <div className="w-8 text-gray-400">{item.position}</div>
            <img
              src={item.image}
              alt={item.song}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div className="flex-grow">
              <div>{item.song}</div>
              <div className="text-sm text-gray-400">{item.artist}</div>
            </div>
            <div className="text-gray-400">3:45</div>
            <button className="ml-4 w-8 h-8 flex items-center justify-center cursor-pointer">
              <Play className="w-4 h-4 text-gray-400" />
            </button>
            <button className="ml-2 w-8 h-8 flex items-center justify-center cursor-pointer">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
