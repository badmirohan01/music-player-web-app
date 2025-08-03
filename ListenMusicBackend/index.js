const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// var cors = require("cors");
const corsMiddleware = require("./middlewares/corsMiddleware");
const { restrictToLoggedInUsersOnly } = require("./middlewares/auth");

const { connectMongoDB } = require("./services/connect");

const userRouter = require("./routes/userRoute");
const apiRouter = require("./routes/apiRoute");
const adsRouter = require("./routes/adsRoute");
const spotifyRouter = require("./routes/fetchSpotifyData");

connectMongoDB("mongodb://127.0.0.1:27017/ListenMusic").then(() =>
  console.log("MongoDB connected locally")
);
// connectMongoDBCluster().then(() => console.log("MongoDB connected"));

//Middlewares
app.use(corsMiddleware);
app.use(restrictToLoggedInUsersOnly);
app.use(express.urlencoded({ extended: false }));
app.use("/tracks", express.static(path.join(__dirname, "public/tracks")));  
app.use("/ads", express.static(path.join(__dirname, "public/ads")));  
app.use("/images", express.static(path.join(__dirname, "public/images")));  
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(501).json({ msg: "An error occoured" });
//   next();
// });

//Routes
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/Advertisements", adsRouter);
app.use("/spotify", spotifyRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
