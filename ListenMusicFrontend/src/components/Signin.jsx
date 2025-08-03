import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  updateTimeDifferenceMs,
} from "../redux/UserProfile/ProfileSlice";
// import oauth2client from "oauth2client";
import qs from "qs";

import { setSessionStatus } from "../redux/SessionStatus/SessionSlice";
import { setLoading } from "../redux/Loading/LoadingSlice";
import { updateAdFreeTime } from "../redux/UserProfile/ProfileSlice";

import axios from "axios";
import { useNavigate } from "react-router";
axios.defaults.withCredentials = true;

const Signin = () => {
  // const isLoggedIn = useSelector((state) => state.sessionStatus.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.sessionStatus.isLoggedIn);
  const adFreeTime = useSelector((state) => state.profile.adFreeTime);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  async function sendUserToBackend(credentialResponse) {
    const decoded = jwtDecode(credentialResponse.credential);
    const url = "http://localhost:3000/user/signin";
    const data = {
      username: decoded.name,
      email: decoded.email,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };
    try {
      const response = await axios(options);
      const data = response.data;
      if (response.data) {
        // dispatch(setSessionStatus());
        dispatch(updateTimeDifferenceMs(data.user?.timeDifferenceMs));
        dispatch(updateAdFreeTime(data.user?.adFreeTime));
        console.log("adFreeTime", adFreeTime);
        // console.log("timeDifferenceMs", data.user?.timeDifferenceMs);
        // console.log("responseData", data);
      }
      // console.log("user sent successfully", response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLoginSuccess(credentialResponse) {
    const decoded = jwtDecode(credentialResponse.credential);
    // console.log("User Info:", decoded);
    dispatch(loginStart());
    // console.log("Credential received:", credentialResponse.credential);
    const url = "http://localhost:3000/api/auth/google";
    const data = {
      credential: credentialResponse.credential,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };
    try {
      const response = await axios(options);
      const data = response.data;
      if (data.success) {
        dispatch(loginSuccess(decoded));
        dispatch(setSessionStatus());
        // dispatch(setLoading());
        // console.log("Backend response:", data);
      } else {
        navigate("/error", { replace: true });
        console.error("Failed to authenticate with backend");
        alert("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  }

  const handleLoginError = () => {
    console.error("Google Login Failed");
    alert("Google Login Failed. Please try again.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 bg-[#1E1E1E] rounded-xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center background-clip bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          Sign in to ListenMusic
        </h2>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <GoogleLogin
            auto_select
            onSuccess={(response) => {
              // dispatch(setLoading());
              sendUserToBackend(response);
              handleLoginSuccess(response);
            }}
            onError={handleLoginError}
            onFailure={(error) => {
              console.log("Login Failed", error);
              dispatch(loginFailure());
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Signin;
