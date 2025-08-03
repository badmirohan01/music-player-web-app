import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveState } from "../redux/Active/activeSlice";
import { setTargetSection } from "../redux/Scroll/ScrollSlice";
import { Link } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";

const Sidebar = () => {
  const active = useSelector((state) => state.activeState.menuItem);
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    const pathToState = {
      "/": "explore",
      "/albums": "albums",
      "/artists": "artists",
      "/radio": "radio",
      "/genre": "genre",
    };
    if (pathToState[location.pathname]) {
      dispatch(setActiveState(pathToState[location.pathname]));
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="fixed overflow-y-scroll scrollbar-hide z-50 mt-[4.5rem] h-full left-0 w-[16vw] bg-gray-900 rounded-lg text-white p-6  ">
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-400 mb-4">MENU</h3>
        <ul className="space-y-3">
          <Link to={"/"} className="block">
            <li
              onClick={() => dispatch(setActiveState("explore"))}
              className={
                active === "explore" && location.pathname === "/"
                  ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                  : "flex items-center text-gray-400 ml-4 cursor-pointer"
              }
            >
              {active === "explore" && location.pathname === "/" && (
                <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
              )}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-3"
                fill="currentColor"
              >
                <path d="M12 16l-8-8h16l-8 8z" />
              </svg>
              Explore
            </li>
          </Link>
          <Link to={"/genre"} className="block">
            <li
              onClick={() => {
                dispatch(setActiveState("genre"));
                // dispatch(setTargetSection("genre"));
              }}
              className={
                active === "genre" && location.pathname === "/genre"
                  ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                  : "flex items-center text-gray-400 ml-4 cursor-pointer"
              }
            >
              {active == "genre" && location.pathname === "/genre" && (
                <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
              )}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-3"
                fill="currentColor"
              >
                <path d="M4 4h16v16H4z" />
              </svg>
              Genres
            </li>
          </Link>
          <Link to={"/albums"} className="block">
            <li
              onClick={() => {
                dispatch(setActiveState("albums")),
                  dispatch(setTargetSection("albums"));
              }}
              className={
                active === "albums" && location.pathname === "/albums"
                  ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                  : "flex items-center text-gray-400 ml-4 cursor-pointer"
              }
            >
              {active == "albums" && location.pathname === "/albums" && (
                <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
              )}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-3"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              </svg>
              Albums
            </li>
          </Link>
          <Link to={"/artists"} className="block">
            <li
              onClick={() => {
                dispatch(setActiveState("artists"));
                dispatch(setTargetSection("topartists"));
              }}
              className={
                active === "artists"
                  ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                  : "flex items-center text-gray-400 ml-4 cursor-pointer"
              }
            >
              {active == "artists" && (
                <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
              )}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-3"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              Artists
            </li>
          </Link>
          <li
            onClick={() => dispatch(setActiveState("radio"))}
            className={
              active === "radio" && location.pathname === "/radio"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "radio" && location.pathname === "/radio" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            Radio
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-400 mb-4">LIBRARY</h3>
        <ul className="space-y-3">
          <li
            onClick={() => dispatch(setActiveState("recents"))}
            className={
              active === "recents"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "recents" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
            </svg>
            Recent
          </li>
          <li
            onClick={() => dispatch(setActiveState("favourites"))}
            className={
              active === "favourites"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "favourites" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Favourites
          </li>
          <li
            onClick={() => dispatch(setActiveState("local"))}
            className={
              active === "local"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "local" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            Local
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 mb-4">PLAYLIST</h3>
        <ul className="space-y-3">
          <li
            onClick={() => dispatch(setActiveState("createNew"))}
            className={
              active === "createNew"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "createNew" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
            Create New
          </li>
          <li
            onClick={() => dispatch(setActiveState("designFlow"))}
            className={
              active === "designFlow"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "designFlow" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Design Flow
          </li>
          <li
            onClick={() => dispatch(setActiveState("BestOf2024"))}
            className={
              active === "BestOf2024"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "BestOf2024" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Best of 2020
          </li>
          <li
            onClick={() => dispatch(setActiveState("NigeriaJams"))}
            className={
              active === "NigeriaJams"
                ? "flex items-center ml-4 text-blue-400 cursor-pointer "
                : "flex items-center text-gray-400 ml-4 cursor-pointer"
            }
          >
            {active == "NigeriaJams" && (
              <span className="w-1 h-6 bg-blue-400 rounded-r-md mr-3"></span>
            )}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-3"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Nigeria Jams
          </li>
        </ul>
      </div>

      <div className="mt-8 mb-15 bg-gray-800 rounded-md p-3 flex items-center">
        <img
          src="/api/placeholder/40/40"
          alt="Google Home"
          className="w-10 h-10 rounded-md mr-3"
        />
        <div>
          <div className="text-sm font-medium">Google Homepod</div>
          <div className="text-xs text-gray-400">Playing on Device</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
