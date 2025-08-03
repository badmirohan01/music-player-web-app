import React, { useEffect, useState } from "react";
import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { setCurrentIndex } from "../redux/FeaturedIndex/FeaturedIndexSlice";
import { useSelector, useDispatch } from "react-redux";

const FeaturedSong = () => {
  const curIndex = useSelector((state) => state.currentIndex.value);
  const [featuredSongs, setFeaturedSongs] = useState({});
  const dispatch = useDispatch();
  const images = [
    "https://assets.teenvogue.com/photos/56fae4a04d85226616422b3b/16:9/w_2560%2Cc_limit/Selena.jpg",
    "https://media.vanityfair.com/photos/569534242a2b051852c0fa0a/16:9/w_1280,c_limit/t-david-bowie-wembley-arena-nicholas-coleridge.jpg",
    "https://theknockturnal.com/wp-content/uploads/2017/05/maxresdefault-1-7.jpg",
    "https://www.hindustantimes.com/ht-img/img/2024/03/17/1600x900/Ed_Sheeran_in_Mumbai_1710625083129_1710672073300.jpg",
    "https://people.com/thmb/BeS5ijwa12KZShAaXRFFc-5jGN4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(758x317:760x319)/taylor-swift-melbourne-021624-6196e6c6557b47cab706d830fa4881f3.jpg",
  ];
  const trackIds = [
    "0FIDCNYYjNvPVimz5icugS",
    "2plbrEY59IikOBgBGLjaoe",
    "4Q0qVhFQa7j6jRKzo3HDmP",
    "6qqrTXSdwiJaq8SO0X2lSe",
    "5vNRhkKd0yEAg8suGBpjeY",
  ];
  // const fetchFeaturedSongs = async () => {
  //   for (const id of albumIds) {
  //     const options = {
  //       method: "GET",
  //       url: `http://localhost:3000/spotify/tracks/${id}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     try {
  //       const response = await axios(options);
  //       if (response.data) {
  //         // console.log("Albums fetched successfully:", response.data);
  //         setFeaturedSongs((prevData) => ({
  //           ...prevData,
  //           [id]: response.data,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching albums:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchFeaturedSongs();
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        setCurrentIndex(curIndex === images.length - 1 ? 0 : curIndex + 1)
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [curIndex, dispatch, images.length]);

  // Manual navigation functions
  const goToSlide = (index) => {
    dispatch(setCurrentIndex(index));
  };

  const goToPrevious = () => {
    dispatch(
      setCurrentIndex(curIndex === 0 ? images.length - 1 : curIndex - 1)
    );
  };

  const goToNext = () => {
    dispatch(
      setCurrentIndex(curIndex === images.length - 1 ? 0 : curIndex + 1)
    );
  };

  return (
    <div className="relative w-[82vw] overflow-hidden h-80 flex items-end p-8 mt-2 rounded-lg bg-gradient-to-r from-gray-900 to-transparent border-white border-1">
      {/* Show only the current image instead of mapping all */}
      <div>
        <div className="z-10 relative">
          <div className="text-sm text-white mb-2">Trending New Hits</div>
          <h1 className="text-6xl font-bold text-white mb-2">Let Her Go</h1>
          <div className="flex items-center text-white mb-4">
            <span className="mr-2">Passenger</span>
            <span className="text-sm text-gray-400">3.6Billion Plays</span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center cursor-pointer">
              <span>Listen Now</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer">
              <Heart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <img
          src={images[curIndex]}
          alt="Featured Artist"
          className="absolute left-0 top-0 w-full h-full object-cover object-top z-0"
          style={{
            maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        <div className="absolute top-10 left-4 -translate-y-1/2 z-20">
          <ArrowLeft
            onClick={goToPrevious}
            className="w-5 h-5 text-white cursor-pointer"
          />
        </div>

        <div className="absolute top-10 right-4 -translate-y-1/2 z-20">
          <ArrowRight
            onClick={goToNext}
            className="w-5 h-5 text-white cursor-pointer"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === curIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSong;
