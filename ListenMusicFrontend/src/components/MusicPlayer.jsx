import { useEffect } from "react";
import {
  MoreVertical,
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Repeat,
  ArrowUp,
  Pause,
} from "lucide-react";
import { useSelector } from "react-redux";
import useAudioPlayer from "../hooks/useAudioPlayer";

const MusicPlayer = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    currentTrackId,
    playTrack,
    togglePlayPause,
    seekTo,
  } = useAudioPlayer();

  const audioTrackData = useSelector(
    (state) => state.audioTrack.audioTrackData
  );

  const adPlaying = useSelector((state) => state.adPlayingStatus.adPlaying);

  // Auto-play when track changes from Redux
  useEffect(() => {
    if (
      audioTrackData?.trackDetails?.album?.id &&
      audioTrackData.trackDetails.id !== currentTrackId
    ) {
      playTrack(audioTrackData.trackDetails.id);
    }
  }, [audioTrackData?.trackDetails?.album?.id, currentTrackId, playTrack]);

  // Format time to mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Get progress percentage for seek bar
  const getProgressPercentage = () => {
    if (!duration || !currentTime) return 0;
    return (currentTime / duration) * 100;
  };

  // Handle seek bar click
  const handleSeekBarClick = (e) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    seekTo(newTime);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white mt-3 mb-3 h-[79.6vh] w-[26.3vw] overflow-auto scrollbar-hide">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-medium">Player</h2>
        <button>
          <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        <img
          src={audioTrackData?.trackDetails?.album?.images[0]?.url}
          alt="Now Playing"
          className="w-full aspect-square rounded-lg mb-4 object-cover"
        />
        <h3 className="text-xl font-medium mb-1 text-center mx-auto">
          {audioTrackData?.trackDetails?.album?.name || "No Track"}
        </h3>
          <p className="text-gray-400 text-center mx-auto">
            {audioTrackData?.trackDetails?.album?.artists
              ?.map((artist) => artist.name)
              .join(", ") || "Unknown Artist"}
          </p>
      </div>

      <div>
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Progress bar */}
          <div
            className="relative h-1 bg-gray-700 rounded-full cursor-pointer"
            onClick={adPlaying ? null : handleSeekBarClick}
          >
            <div
              className="absolute left-0 top-0 h-full bg-white rounded-full"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button disabled={adPlaying ? true : false}>
            <Shuffle className="w-5 h-5 text-gray-400 cursor-pointer" />
          </button>
          <button disabled={adPlaying ? true : false}>
            <SkipBack className="w-5 h-5 text-gray-400 cursor-pointer" />
          </button>
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause
                className="w-6 h-6 text-white cursor-pointer"
                fill="currentColor"
              />
            ) : (
              <Play
                className="w-6 h-6 text-white cursor-pointer"
                fill="currentColor"
              />
            )}
          </button>
          <button disabled={adPlaying ? true : false}>
            <SkipForward className="w-5 h-5 text-gray-400 cursor-pointer" />
          </button>
          <button disabled={adPlaying ? true : false}>
            <Repeat className="w-5 h-5 text-gray-400 cursor-pointer" />
          </button>
        </div>

        <button className="w-full flex items-center justify-center text-gray-400">
          <ArrowUp className="w-4 h-4 mr-1 cursor-pointer" />
          <span className="uppercase text-xs">Lyrics</span>
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
