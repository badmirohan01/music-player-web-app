import { useState, useEffect, useRef } from "react";
import { Search, Bell } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setNavbar } from "../redux/Navbar/NavBarSlice";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { googleLogout } from "@react-oauth/google";
import { setSessionStatus } from "../redux/SessionStatus/SessionSlice";
import { useNavigate } from "react-router";
import { persistor } from "../redux/store.js";
import useAudioPlayer from "../hooks/useAudioPlayer.js";

const NavBar = () => {
  const isFirstRender = useRef(true);
  const navbarItem = useSelector((state) => state.Navbar.NavbarItem);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.profile.name);
  const profilePicture = useSelector((state) => state.profile.profilePicture);
  const emailVerified = useSelector((state) => state.profile.emailVerified);
  const navigate = useNavigate();
  const timeDifferenceMs = useSelector(
    (state) => state.profile.timeDifferenceMs
  );
  // console.log(timeDifferenceMs);
  const { pauseTrack } = useAudioPlayer();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the first execution
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      handleLogout();
    }, timeDifferenceMs);

    return () => clearTimeout(timer); // cleanup when component unmounts or timeDifferenceMs changes
  }, [timeDifferenceMs]); // dependency array

  const handleLogout = async () => {
    try {
      googleLogout();

      // Clear user state
      // setUser(null);

      await persistor.purge();
      await persistor.flush();
      pauseTrack();
      localStorage.removeItem("persist:root");

      dispatch(setSessionStatus());
      navigate("/signin");

      fetch("user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log("Logout API call failed:", err));

      // console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-gray-900">
      <div className="flex items-center text-white">
        <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="currentColor">
          <path d="M12 3v1.5a7.5 7.5 0 107.5 7.5H21A9 9 0 0112 3zm0 4v1.5A3.5 3.5 0 0115.5 12H17a5 5 0 00-5-5z" />
        </svg>
        <span className="font-bold">Listen Music</span>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => dispatch(setNavbar("music"))}
          className={
            navbarItem === "music"
              ? "px-4 py-2 text-white uppercase cursor-pointer"
              : "px-4 py-2 text-gray-400 uppercase cursor-pointer"
          }
        >
          Music
        </button>
        <button
          onClick={() => dispatch(setNavbar("podcast"))}
          className={
            navbarItem === "podcast"
              ? "px-4 py-2 text-white uppercase cursor-pointer"
              : "px-4 py-2 text-gray-400 uppercase cursor-pointer"
          }
        >
          Podcast
        </button>
        <button
          onClick={() => dispatch(setNavbar("live"))}
          className={
            navbarItem === "live"
              ? "px-4 py-2 text-white uppercase cursor-pointer"
              : "px-4 py-2 text-gray-400 uppercase cursor-pointer"
          }
        >
          Live
        </button>
      </div>

      <div className="relative flex items-center w-10">
        <Search className="absolute left-2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Find your vibe"
          className="pl-8 pr-4 py-2 bg-gray-800 rounded-md text-gray-300 focus:outline-none w-64"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-gray-400 w-5 h-5 cursor-pointer" />
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {emailVerified ? (
            <div className="flex items-center bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
              <img
                src={profilePicture}
                alt="User"
                className="w-7 h-7 rounded-md mr-2"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
              <span className="text-white text-sm">{userName}</span>
            </div>
          ) : (
            <div className="flex items-center bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
              <span className="text-white text-sm">Login</span>
            </div>
          )}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* <div className="flex items-center bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
          <img
            src={userData.profilePicture || "default-avatar.png"}
            alt="User"
            className="w-7 h-7 rounded-md mr-2"
          />
          <span className="text-white text-sm">Login</span>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;
