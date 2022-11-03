import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <video ref={videoRef} autoPlay muted={true} />
    </>
  );
};

export default VideoPlayer;
