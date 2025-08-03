import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";
import FeaturedSong from "./Featuredsong";
import Albums from "./Albums";

const AlbumsExpd = () => {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="flex overflow-y-scroll scrollbar-hide">
        <Sidebar />
        <div className="bg-gray-900 ml-[16vw] pl-[1vw] w-full mt-[4.5rem] overflow-y-scroll scrollbar-hide">
          <FeaturedSong />
          <div className="flex gap-3 items-center">
            <Albums />
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumsExpd;
