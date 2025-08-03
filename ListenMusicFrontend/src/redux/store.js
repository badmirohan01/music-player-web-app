import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import activeStateReducer from "./Active/activeSlice";
import NavbarReducer from "./Navbar/NavBarSlice";
import scrollReducer from "./Scroll/ScrollSlice";
import pageRouteReducer from "./PageRoute/PageRouteSlice";
import featuredSongReducer from "./FeaturedIndex/FeaturedIndexSlice";
import accountReducer from "./AccountSignin/AccountSlice";
import sessionReducer from "./SessionStatus/SessionSlice";
import profileReducer from "./UserProfile/ProfileSlice";
import LoadingReducer from "./Loading/LoadingSlice";
import audioTrackReducer from "./AudioTrack/AudioTrackSlice";
import adPlayingReducer from "./AdPlaying/AdPlayingSlice";
import fetchIdReducer from "./FetchId/FetchIdSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "profile",
    "sessionStatus",
    "audioTrack",
    "loading",
    "pageRoute",
    "audioTrack",
    "fetchId",
  ], // reducers to persist
};

const rootReducer = combineReducers({
  activeState: activeStateReducer,
  Navbar: NavbarReducer,
  scroll: scrollReducer,
  pageRoute: pageRouteReducer,
  currentIndex: featuredSongReducer,
  accountSignin: accountReducer,
  sessionStatus: sessionReducer,
  profile: profileReducer,
  loading: LoadingReducer,
  audioTrack: audioTrackReducer,
  adPlayingStatus: adPlayingReducer,
  fetchId: fetchIdReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     activeState: activeStateReducer,
//     Navbar: NavbarReducer,
//     scroll: scrollReducer,
//     pageRoute: pageRouteReducer,
//     currentIndex: featuredSongReducer,
//     accountSignin: accountReducer,
//     sessionStatus: sessionReducer,
//     profile: profileReducer,
//     loading: LoadingReducer,
//     audioTrack: audioTrackReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
});

export const persistor = persistStore(store);
