import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";
import { MdOutlineRadioButtonUnchecked, MdSearch } from "react-icons/md";
import { MdChatBubble } from "react-icons/md";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { selectUser } from "../features/counter/appSlice";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";

export default function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage())
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => 
            auth.signOut()}
          alt=""
          className="chats__avatar"
        />
        <div className="chats__search">
          <MdSearch 
          className="chats__searchIcon"
          />
          <input placeholder="Friends" type="text" />
        </div>
        <MdChatBubble className="chats__chatIcon" />
      </div>
      <div className="chat__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <MdOutlineRadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}
