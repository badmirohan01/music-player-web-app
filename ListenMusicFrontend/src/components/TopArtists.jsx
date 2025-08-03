import { useEffect } from "react";

import { X } from "lucide-react";

import { Link } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { setActiveState } from "../redux/Active/activeSlice";
import { setTargetSection } from "../redux/Scroll/ScrollSlice";
import { setPageRoute } from "../redux/PageRoute/PageRouteSlice";

const TopArtists = () => {
  const topArtistsData = [
    {
      name: "Travis Scott",
      plays: "44M",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQxHEdTwUeuK24FIYJ_IH0ygCkgttkdsEkG37iYIPKu01eikAyum-DTDh1OK3V1kcxxUkDbqbtsAavQeFDZlVd9YQ",
    },
    {
      name: "Billie Eilish",
      plays: "203M",
      image: "/assets/Artists/Billie Eilish.jpeg",
    },
    { name: "The Kid", plays: "63M", image: "/assets/Artists/The kid.webp" },
    { name: "Kanye", plays: "15M", image: "/assets/Artists/Kanye.jpeg" },
    {
      name: "Nicki Minaj",
      plays: "180M",
      image: "/assets/Artists/Nicki Minaj.jpeg",
    },
    { name: "Starboy", plays: "109M", image: "/assets/Artists/StarBoy.jpeg" },
    {
      name: "Travis Scott",
      plays: "44M",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQxHEdTwUeuK24FIYJ_IH0ygCkgttkdsEkG37iYIPKu01eikAyum-DTDh1OK3V1kcxxUkDbqbtsAavQeFDZlVd9YQ",
    },
    {
      name: "Billie Eilish",
      plays: "203M",
      image: "/assets/Artists/Billie Eilish.jpeg",
    },
    { name: "The Kid", plays: "63M", image: "/assets/Artists/The kid.webp" },
    { name: "Kanye", plays: "15M", image: "/assets/Artists/Kanye.jpeg" },
    {
      name: "Nicki Minaj",
      plays: "180M",
      image: "/assets/Artists/Nicki Minaj.jpeg",
    },
    { name: "Starboy", plays: "109M", image: "/assets/Artists/StarBoy.jpeg" },
    {
      name: "Travis Scott",
      plays: "44M",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQxHEdTwUeuK24FIYJ_IH0ygCkgttkdsEkG37iYIPKu01eikAyum-DTDh1OK3V1kcxxUkDbqbtsAavQeFDZlVd9YQ",
    },
    {
      name: "Billie Eilish",
      plays: "203M",
      image: "/assets/Artists/Billie Eilish.jpeg",
    },
    { name: "The Kid", plays: "63M", image: "/assets/Artists/The kid.webp" },
    { name: "Kanye", plays: "15M", image: "/assets/Artists/Kanye.jpeg" },
    {
      name: "Nicki Minaj",
      plays: "180M",
      image: "/assets/Artists/Nicki Minaj.jpeg",
    },
    { name: "Starboy", plays: "109M", image: "/assets/Artists/StarBoy.jpeg" },
    {
      name: "Travis Scott",
      plays: "44M",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQxHEdTwUeuK24FIYJ_IH0ygCkgttkdsEkG37iYIPKu01eikAyum-DTDh1OK3V1kcxxUkDbqbtsAavQeFDZlVd9YQ",
    },
    {
      name: "Billie Eilish",
      plays: "203M",
      image: "/assets/Artists/Billie Eilish.jpeg",
    },
    { name: "The Kid", plays: "63M", image: "/assets/Artists/The kid.webp" },
    { name: "Kanye", plays: "15M", image: "/assets/Artists/Kanye.jpeg" },
    {
      name: "Nicki Minaj",
      plays: "180M",
      image: "/assets/Artists/Nicki Minaj.jpeg",
    },
    { name: "Starboy", plays: "109M", image: "/assets/Artists/StarBoy.jpeg" },
  ];

  const targetSection = useSelector((state) => state.scroll.targetSection);
  const active = useSelector((state) => state.activeState.menuItem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (targetSection === "topartists") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // For smooth scrolling
      });
    }
  }, [[targetSection, dispatch]]);

  return (
    <div
      className={
        active === "artists" && window.location.pathname === "/artists"
          ? "w-[55vw] h-[37.1rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll scrollbar-hide mt-3 z-50 transition-all duration-500 ease-out"
          : "px-8 pt-4 pb-8 bg-gray-800 w-[55vw] h-[32vh] mt-3 mb-3 overflow-hidden rounded-lg transition-all duration-300 ease-out "
      }
    >
      {active === "artists" && window.location.pathname === "/artists" ? (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Top Artists</h2>
          <Link to={"/"}>
            <X
              onClick={() => dispatch(setActiveState("explore"))}
              className="text-sm  text-gray-400 cursor-pointer hover:bg-gray-900 rounded-full p-1"
            ></X>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Top Artists</h2>
          <Link
            to={"/artists"}
            onClick={() => {
              dispatch(setActiveState("artists")),
                dispatch(setTargetSection("topartists"));
            }}
            className="text-sm text-gray-400 cursor-pointer"
          >
            See all
          </Link>
        </div>
      )}

      <div className="grid grid-cols-6 gap-4">
        {topArtistsData.map((artist, index) => (
          <Link
            to={`/artists/${artist.name.replace(/\s+/g, "")}`}
            key={index}
          >
            <div
              onClick={() => {
                dispatch(setPageRoute(artist.name));
                dispatch(setActiveState("artists"));
              }}
              className="text-center hover:bg-gray-900 cursor-pointer rounded-lg
      p-1 transition duration-300 ease-in-out"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full aspect-square rounded-md mb-2 object-cover"
              />
              <div className="text-white text-sm">{artist.name}</div>
              <div className="text-gray-400 text-xs">{artist.plays} Plays</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
