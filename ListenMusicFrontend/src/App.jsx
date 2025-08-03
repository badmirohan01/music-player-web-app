import "./style.css"
import { BrowserRouter, Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateAdFreeTime } from "./redux/UserProfile/ProfileSlice";
import { useEffect } from "react";
import Home from "./components/Home";
import ArtistComp from "./components/ArtistComp";
import TopArtistsExpd from "./components/TopArtistsExpd";
import AlbumsExpd from "./components/AlbumsExpd";
import GenresExpd from "./components/GenresExpd";
import TopChartsExpd from "./components/TopChartsExpd";
import Signin from "./components/Signin";
import Tracks from "./components/Tracks";

function App() {
  const timeDifference = useSelector((state) => state.profile.timeDifference);
  const adFreeTime = useSelector((state) => state.profile.adFreeTime);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof timeDifference !== "number" || timeDifference <= 0 && adFreeTime === false) return;

    const timeout = setTimeout(() => {
      dispatch(updateAdFreeTime(false));
    }, timeDifference);

    return () => clearTimeout(timeout); 
  }, [timeDifference]);

  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Home />} />

      <Route path="artists">
        <Route index element={<TopArtistsExpd />} />
        <Route path="/artists/:params" element={<ArtistComp />} />
      </Route>
      <Route path="/genre" element={<GenresExpd />} />
      <Route path="/topcharts" element={<TopChartsExpd />} />
      <Route path="albums">
        <Route path="/albums" element={<AlbumsExpd />} />
        <Route path="/albums/:params" element={<ArtistComp />} />
      </Route>

      {/* <Route path="artists" index element={<ArtistComp />} /> */}
    </Routes>
  );
}

export default App;
