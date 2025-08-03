import React from "react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveState } from "../redux/Active/activeSlice";
import { Link } from "react-router";
// import { setTargetSection } from "../redux/Scroll/ScrollSlice";

const Genres = () => {
  const genresData = [
    { name: "Dance Beat", color: "bg-blue-400" },
    { name: "Electro Pop", color: "bg-amber-100" },
    { name: "Alternative Indie", color: "bg-orange-300" },
    { name: "Hip Hop", color: "bg-teal-700" },
    { name: "Classical Period", color: "bg-pink-300" },
    { name: "Hip Hop Rap", color: "bg-purple-500" },
    //Duplicate values for testing
    { name: "Dance Beat", color: "bg-blue-400" },
    { name: "Electro Pop", color: "bg-amber-100" },
    { name: "Alternative Indie", color: "bg-orange-300" },
    { name: "Hip Hop", color: "bg-teal-700" },
    { name: "Classical Period", color: "bg-pink-300" },
    { name: "Hip Hop Rap", color: "bg-purple-500" },
    { name: "Dance Beat", color: "bg-blue-400" },
    { name: "Electro Pop", color: "bg-amber-100" },
    { name: "Alternative Indie", color: "bg-orange-300" },
    { name: "Hip Hop", color: "bg-teal-700" },
    { name: "Classical Period", color: "bg-pink-300" },
    { name: "Hip Hop Rap", color: "bg-purple-500" },
    { name: "Dance Beat", color: "bg-blue-400" },
    { name: "Electro Pop", color: "bg-amber-100" },
    { name: "Alternative Indie", color: "bg-orange-300" },
    { name: "Hip Hop", color: "bg-teal-700" },
    { name: "Classical Period", color: "bg-pink-300" },
    { name: "Hip Hop Rap", color: "bg-purple-500" },
  ];
  const section = useRef(null);
  const targetSection = useSelector((state) => state.scroll.targetSection);
  const active = useSelector((state) => state.activeState.menuItem);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (targetSection === "genre") {
  //     window.scrollTo({
  //       top: document.body.scrollHeight,
  //       behaviour: "smooth",
  //     });
  //   }
  // }, [[targetSection, dispatch]]);

  return (
    // <div className="w-[26.9vw] h-[46vh] px-8 pt-4 pb-8 bg-gray-800 text-lg rounded-lg overflow-y-scroll scrollbar-hide transition-all duration-300 ease-out">
    <div
      className={
        active === "genre" && window.location.pathname === "/genre"
          ? "w-[55vw] h-[37.1rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll scrollbar-hide mt-4 mb-3 left-[17vw] z-50 transition-all duration-500 ease-out"
          : "px-8 pt-4 pb-8 bg-gray-800 w-[26.9vw] h-[46vh] overflow-hidden rounded-lg transition-all duration-300 ease-in-out "
      }
    >
      {active === "genre" && window.location.pathname === "/genre" ? (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Genre</h2>
          <Link to={"/"}>
            <X
              onClick={() => dispatch(setActiveState("explore"))}
              className="text-sm  text-gray-400 cursor-pointer hover:bg-gray-900 rounded-full p-1"
            ></X>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Genres</h2>
          <Link to={"/genre"}>
            <button
              onClick={() => dispatch(setActiveState("genre"))}
              className="text-sm text-gray-400 cursor-pointer"
            >
              See all
            </button>
          </Link>
        </div>
      )}

      <div
        className={
          active === "genre" && window.location.pathname === "/genre"
            ? "grid grid-cols-4 gap-3 text-sm"
            : "grid grid-cols-3 gap-3 text-sm"
        }
      >
        {genresData.map((genre, index) => (
          <div
            key={index}
            className={`${genre.color} h-24 flex items-end hover:bg-gray-900 cursor-pointer rounded-lg p-1 transition duration-300 ease-in-out`}
          >
            <span className="text-white font-medium">{genre.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
