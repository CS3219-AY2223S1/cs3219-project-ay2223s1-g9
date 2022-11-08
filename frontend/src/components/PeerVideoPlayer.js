import { useEffect, useRef } from "react";
import styles from "./VideoPlayer.module.scss";

const PeerVideoPlayer = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <video className={styles.videoInsert} ref={videoRef} autoPlay />
    </>
  );
};

export default PeerVideoPlayer;
