import Webcam from "react-webcam";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IoRadioButtonOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";
import "./WebcamCapture.css"


const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate('./preview')
  }, [webcamRef,dispatch,navigate]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <IoRadioButtonOff className="webcamCapture__button" onClick={capture} />
     
    </div>
  );
}

export default WebcamCapture;
