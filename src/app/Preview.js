import React, { useEffect } from "react";
import "./Preview.css";
import { useDispatch, useSelector } from "react-redux";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  MdAttachFile,
  MdCreate,
  MdCrop,
  MdMusicNote,
  MdNotes,
  MdOutlineTimer,
  MdSend,
  MdTextFields,
} from "react-icons/md";

import { v4 as uuidv4 } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase";
import {selectUser} from "../features/counter/appSlice"

export default function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  useEffect(() => {
    if (!cameraImage) navigate("/");
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  const sendPost = () => {
    const id = uuidv4();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_change",
      null,
      (error) => {
        // ERROR function
        console.log(error);
      },
      () => {
        // COMPLETE function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: "GettyWINSLO",
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            navigate("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <IoClose onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarright">
        <MdTextFields className="icons" />
        <MdCreate className="icons" />
        <MdNotes className="icons" />
        <MdMusicNote className="icons" />
        <MdAttachFile className="icons" />
        <MdCrop className="icons" />
        <MdOutlineTimer className="icons" />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <MdSend fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}
