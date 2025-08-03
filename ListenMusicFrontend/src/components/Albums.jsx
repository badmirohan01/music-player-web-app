import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveState } from "../redux/Active/activeSlice";
import { setPageRoute } from "../redux/PageRoute/PageRouteSlice";
import { Link } from "react-router";
import { useLocation } from "react-router";
import api from "../api/axios";

const Albums = () => {
  const albumIds = [
    "0Rkv5iqjF2uenfL0OVB8hg",
    "2yYfIOq25JQWvUQ9AR172D",
    "1poClftP5T3zRcqpsxPPfW",
    "1WwkojG9sjMSrFVz4D51W0",
    "2Lxoc72vRTGdQfMvj7Ovi1",
    "3BGU0BqGwBkYDHpfCWFm7I",
    "45ZIondgVoMB84MQQaUo9T",
  ];
  const section = useRef(null);
  const targetSection = useSelector((state) => state.scroll.targetSection);
  const active = useSelector((state) => state.activeState.menuItem);
  const dispatch = useDispatch();
  const location = useLocation();
  const [albumsData, setAlbumsData] = useState({});

  const handleAlbumsFetch = async () => {
    for (const id of albumIds) {
      try {
        const response = await api.get(`/spotify/albums/${id}`);
        if (response.data) {
          // console.log("Albums fetched successfully:", response.data);
          setAlbumsData((prevData) => ({
            ...prevData,
            [id]: response.data,
          }));
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    }
  };
  useEffect(() => {
      handleAlbumsFetch();
  }, []);

  useEffect(() => {
    if (targetSection === "albums") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [[targetSection, dispatch]]);

  return (
    <div
      className={
        active === "albums" && location.pathname === "/albums"
          ? "w-[55vw] h-[37.1rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll scrollbar-hide mt-4 mb-3 left-[17vw] z-50 transition-all duration-500 ease-out"
          : "px-8 pt-4 pb-8 bg-gray-800 w-[55vw] h-[32vh] mt-3 mb-3 overflow-hidden rounded-lg transition-all duration-300 ease-out "
      }
    >
      {active === "albums" && location.pathname === "/albums" ? (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Albums</h2>
          <Link to={"/"} onClick={() => dispatch(setActiveState("explore"))}>
            <X className="text-sm  text-gray-400 cursor-pointer hover:bg-gray-900 rounded-full p-1"></X>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Albums</h2>
          <Link
            to={"/albums"}
            onClick={() => {
              dispatch(setActiveState("albums"));
              // dispatch(setTargetSection("albums"));
            }}
            className="text-sm text-gray-400 cursor-pointer"
          >
            See all
          </Link>
        </div>
      )}

      <div className="grid grid-cols-6 gap-4">
        {Object.values(albumsData).map((album, index) => (
          <Link to={`/albums/${album.id}`} key={index}>
            <div
              onClick={() => {
                dispatch(setPageRoute(album.id));
                dispatch(setActiveState("albums"));
              }}
              className="text-center hover:bg-gray-900 cursor-pointer rounded-lg p-1 transition duration-300 ease-in-out h-52 overflow-hidden"
            >
              <img
                src={album.images[0].url}
                alt={album.name}
                className="w-full aspect-square rounded-md mb-2 object-cover"
              />
              <div className="text-white text-sm">{album.name}</div>
              <div className="text-gray-400 text-xs">
                {album.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Albums;
