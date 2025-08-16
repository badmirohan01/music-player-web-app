// hooks/useAudioPlayer.js
import { useState, useRef, useEffect } from "react";

// Global audio instance to persist across component remounts
let globalAudioInstance = null;
let globalAudioState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentTrackId: null,
  hasEnded: false,
  listeners: new Set(),
};

const useAudioPlayer = () => {
  const [state, setState] = useState({
    isPlaying: globalAudioState.isPlaying,
    currentTime: globalAudioState.currentTime,
    duration: globalAudioState.duration,
    currentTrackId: globalAudioState.currentTrackId,
    hasEnded: globalAudioState.hasEnded,
  });

  // Create or get the global audio instance
  const audioRef = useRef(globalAudioInstance);

  if (!audioRef.current) {
    audioRef.current = new Audio();
    globalAudioInstance = audioRef.current;

    // Set up event listeners once
    audioRef.current.addEventListener("loadedmetadata", () => {
      globalAudioState.duration = audioRef.current.duration;
      updateAllListeners();
    });

    audioRef.current.addEventListener("timeupdate", () => {
      globalAudioState.currentTime = audioRef.current.currentTime;
      updateAllListeners();
    });

    audioRef.current.addEventListener("ended", () => {
      globalAudioState.isPlaying = false;
      globalAudioState.currentTime = 0;
      globalAudioState.hasEnded = true;
      updateAllListeners();
    });
  }

  // Update all listening components
  const updateAllListeners = () => {
    globalAudioState.listeners.forEach((listener) => {
      listener({
        isPlaying: globalAudioState.isPlaying,
        currentTime: globalAudioState.currentTime,
        duration: globalAudioState.duration,
        currentTrackId: globalAudioState.currentTrackId,
        hasEnded: globalAudioState.hasEnded,
      });
    });
  };

  // Register this component as a listener
  useEffect(() => {
    globalAudioState.listeners.add(setState);
    return () => globalAudioState.listeners.delete(setState);
  }, []);

  // Play a new track
  const playTrack = async (trackId, url) => {
    if (trackId && trackId !== globalAudioState.currentTrackId) {
      globalAudioState.currentTrackId = trackId;
      globalAudioState.hasEnded = false; // Reset hasEnded when starting new track
      audioRef.current.src = url; // Assuming urls is an array of track URLs
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          globalAudioState.isPlaying = true;
          updateAllListeners();
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          globalAudioState.isPlaying = false;
          updateAllListeners();
        });
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current || !globalAudioState.currentTrackId) return;

    if (globalAudioState.isPlaying) {
      audioRef.current.pause();
      globalAudioState.isPlaying = false;
    } else {
      // Reset hasEnded when resuming playback
      if (globalAudioState.hasEnded) {
        globalAudioState.hasEnded = false;
      }
      audioRef.current
        .play()
        .then(() => {
          globalAudioState.isPlaying = true;
          updateAllListeners();
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          globalAudioState.isPlaying = false;
          updateAllListeners();
        });
    }
    updateAllListeners();
  };

  // Pause track only if it's playing
  const pauseTrack = () => {
    if (!audioRef.current || !globalAudioState.currentTrackId) return;

    if (globalAudioState.isPlaying) {
      audioRef.current.pause();
      globalAudioState.isPlaying = false;
      updateAllListeners();
    }
  };

  // Seek to specific time
  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      globalAudioState.currentTime = time;
      updateAllListeners();
    }
  };

  return {
    ...state,
    playTrack,
    togglePlayPause,
    pauseTrack,
    seekTo,
    audioRef,
  };
};

export default useAudioPlayer;
