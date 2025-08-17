import "./style.css"
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import ArtistComp from "./components/ArtistComp";
import TopArtistsExpd from "./components/TopArtistsExpd";
import AlbumsExpd from "./components/AlbumsExpd";
import GenresExpd from "./components/GenresExpd";
import TopChartsExpd from "./components/TopChartsExpd";
import Signin from "./components/Signin";

function App() {
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
    </Routes>
  );
}

export default App;
