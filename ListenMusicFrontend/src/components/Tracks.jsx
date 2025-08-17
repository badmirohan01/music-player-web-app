import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef, use } from "react";
import { Link } from "react-router";
import { X, MoreVertical, Play } from "lucide-react";
import { setActiveState } from "../redux/Active/activeSlice";
import { setAudioTrackData } from "../redux/AudioTrack/AudioTrackSlice";
import axios from "axios";
import useAudioPlayer from "../hooks/useAudioPlayer";
import { setAdPlaying } from "../redux/AdPlaying/AdPlayingSlice";
import { setFetchId } from "../redux/FetchId/FetchIdSlice";

const Tracks = () => {
  const isFirstRender = useRef(true);

  const { hasEnded } = useAudioPlayer();
  const { playTrack } = useAudioPlayer();
  const [tracks, setTracks] = useState([]);
  // const [fetchId, setFetchId] = useState(null);
  const [useAlternateURL, setUseAlternateURL] = useState(true);
  const [responseData, setResponseData] = useState("");

  const dispatch = useDispatch();
  const albumId = useSelector((state) => state.pageRoute.value);
  const adPlaying = useSelector((state) => state.adPlayingStatus.adPlaying);
  const fetchId = useSelector((state) => state.fetchId.idValue);
  const adFreeTime = useSelector((state) => state.profile.adFreeTime);
  // console.log("adFreeTime in tracks component", adFreeTime);

  const fetchTracks = async () => {
    const options = {
      method: "GET",
      url: `http://localhost:3000/spotify/albums/${albumId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(options);
      if (response.data) {
        // console.log("Albums fetched successfully:", response.data);
        setTracks(response.data.tracks.items);
        setResponseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  function getDuration(duration_ms) {
    const totalSeconds = Math.floor(duration_ms / 1000);

    // Extract minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format as mm:ss
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    return formattedTime;
  }

  useEffect(() => {
    fetchTracks();
  }, [albumId]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 👈 skip on first render
    }
    if (hasEnded) {
      adPlaying && dispatch(setAdPlaying());
      handleTrackClick();
    }
  }, [hasEnded]);

  async function handleTrackClick() {
    const currentUrl = useAlternateURL
      ? `http://localhost:3000/advertisements/ads`
      : `http://localhost:3000/spotify/tracks/${fetchId}`;
    const options = {
      method: "GET",
      url: currentUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios(options);
      if (response.data) {
        dispatch(
          setAudioTrackData({
            trackDetails: {
              ...response.data,
            },
          })
        );
        // console.log("Track fetched successfully:", response.data);
        // console.log(response.data.trackUrl);
        if (useAlternateURL && !adPlaying) {
          dispatch(setAdPlaying());
        }
        playTrack(response.data.id, response.data.trackUrl);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
    setUseAlternateURL((prev) => !prev);
  }

  async function handleTrackClick1() {
    const options = {
      method: "GET",
      url: `http://localhost:3000/spotify/tracks/${fetchId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios(options);
      if (response.data) {
        dispatch(
          setAudioTrackData({
            trackDetails: {
              ...response.data,
            },
          })
        );
        // console.log("Track fetched successfully:", response.data);
        // console.log(response.data.trackUrl);
        playTrack(response.data.id, response.data.trackUrl);
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  }

  return (
    <div className="w-[55vw] h-[36rem] px-8 pt-4 pb-8 bg-gray-800 rounded-lg overflow-y-scroll scrollbar-hide transition-all duration-500 ease-out mt-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-medium">
          {responseData.name} Tracks
        </h2>
        <Link to={"/albums"}>
          <X
            onClick={() => dispatch(setActiveState("albums"))}
            className="text-sm  text-gray-400 cursor-pointer hover:bg-gray-900 rounded-full p-1"
          ></X>
        </Link>
      </div>

      <div>
        {tracks.map((item, index) => (
          <div
            key={index}
            className="flex items-center text-sm text-white hover:bg-gray-900 cursor-pointer rounded-lg p-1 transition duration-300 ease-in-out"
          >
            <div className="w-8 text-gray-400">{index + 1}</div>
            <img
              src={responseData.images[0]?.url}
              alt={item.song}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div className="flex-grow">
              <div>{item.name}</div>
              <div className="text-sm text-gray-400">
                {item.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
            <div className="text-gray-400">{getDuration(item.duration_ms)}</div>
            <button
              disabled={adPlaying}
              className="ml-4 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-500 rounded-2xl"
              onClick={() => {
                console.log("clicked");
                dispatch(setFetchId(item.id));
                // console.log(fetchId);
                adFreeTime ? handleTrackClick1() : handleTrackClick();
              }}
            >
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

// export { handleTrackClick };
export default Tracks;
