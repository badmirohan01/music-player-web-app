import { useEffect } from "react";
import { MoreVertical, Play, X } from "lucide-react";
import { useSelector } from "react-redux";

import { Link } from "react-router";

const ArtistExpd = () => {
  const artistName = useSelector((state) => state.pageRoute.value);
  const artistSongData = [
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
      song: "Lean On",
      artist: "Major Lazer ft DJ Snake",
      image: "/assets/TopCharts/Lean On.jpeg",
    },
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
      song: "Lean On",
      artist: "Major Lazer ft DJ Snake",
      image: "/assets/TopCharts/Lean On.jpeg",
    },
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
      song: "Lean On",
      artist: "Major Lazer ft DJ Snake",
      image: "/assets/TopCharts/Lean On.jpeg",
    },
  ];

  // const fetchTracks = async () => {
  //     for (const id of albumIds) {
  //       const options = {
  //         method: "GET",
  //         url: `http://localhost:3000/spotify/albums/${id}`,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  
  //       try {
  //         const response = await axios(options);
  //         if (response.data) {
  //           // console.log("Albums fetched successfully:", response.data);
  //           setAlbumsData((prevData) => ({
  //             ...prevData,
  //             [id]: response.data,
  //           }));
  //         }
  //       } catch (error) {
  //         console.error("Error fetching albums:", error);
  //       }
  //     }
  //   };

  // useEffect(() => {
    
  // }, [third])
  
  return (
    <div className="w-[55vw] h-[36rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll scrollbar-hide transition-all duration-500 ease-out mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-medium">{artistName} Songs</h2>
        <Link to={"/"}>
          <X
            onClick={() => dispatch(setActiveState("explore"))}
            className="text-sm  text-gray-400 cursor-pointer hover:bg-gray-900 rounded-full p-1"
          ></X>
        </Link>
      </div>

      <div>
        {artistSongData.map((item, index) => (
          <div
            key={index}
            className="flex items-center text-sm text-white hover:bg-gray-900 cursor-pointer rounded-lg p-1 transition duration-300 ease-in-out"
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

export default ArtistExpd;
