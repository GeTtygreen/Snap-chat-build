import React, { useEffect } from "react";
import WebcamCapture from "./app/WebcamCapture";
import { Routes, Route } from "react-router-dom";
import Preview from "./app/Preview";
import "./app/App.css";
import Chats from "./app/Chats";
import ChatView from "./app/ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/counter/appSlice";
import Login from "./app/Login";
import { auth } from "./app/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <img
            src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
            alt=""
            className="app__logo"
          />
          <div className="app__body">
          <div className="app__bodyBackground">
            <Routes className="app__body">
              <Route exact path="/chats/view" element={<ChatView />} />
              <Route exact path="/chats" element={<Chats />} />
              <Route exact path="/preview" element={<Preview />} />
              <Route exact path="/" element={<WebcamCapture />} />
            </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
