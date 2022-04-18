import React from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import { FaStop } from "react-icons/fa";
import { selectImage } from "../features/counter/appSlice";
import { useDispatch } from "react-redux";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Chat({
  id,
  username,
  timestamp,
  read,
  imageUrl,
  profilePic,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      navigate('/chats/view')
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
           {!read && "Tap to view - "}{" "} {new Date(timestamp?.toDate()).toUTCString()} </p>
      </div>
      {!read && <FaStop className="chat__readIcon" />}
    </div>
  );
}
