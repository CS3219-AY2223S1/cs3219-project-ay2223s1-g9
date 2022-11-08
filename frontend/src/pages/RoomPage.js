import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../AuthContext";
import { RoomContext, Pages } from "../contexts/RoomContext";
import CodeEditor from "../components/CodeEditor";
import VideoPlayer from "../components/VideoPlayer";
import PeerVideoPlayer from "../components/PeerVideoPlayer";
import StandardPage from "../components/templates/StandardPage";
import BodyCopy from "../components/atoms/BodyCopy";
import LinkText from "../components/atoms/LinkText";
import styles from "./RoomPage.module.scss";
import SecondaryButton from "../components/atoms/SecondaryButton";
import PrimaryButton from "../components/atoms/PrimaryButton";
import BodyCopyLarge from "../components/atoms/BodyCopyLarge";
import VideoOffIcon from "../assets/icons/VideoOffIcon";
import VideoIcon from "../assets/icons/VideoIcon";

const RoomPage = () => {
  const { user, setUser } = useContext(AuthContext); // contains user.username and user.token
  const { setPage, room, socket, myStream, me } = useContext(RoomContext);
  const [question, setQuestion] = useState({
    title: "",
    data: <p>question data here</p>,
  });
  const [myPeerStream, setMyPeerStream] = useState(null);
  const [isShowingMyStream, setIsShowingMyStream] = useState(false);
  const [isShowingPeerStream, setIsShowingPeerStream] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // NOTE TO ANDREA: HELP CREATE A BUTTON TO LEAVE THE ROOM SO WE CAN USE THAT INSTEAD OF THE BROWSER BACK BUTTON.
    window.onpopstate = (_) => {
      socket.emit("leaveRoom", { roomId: room.roomId });
      setPage(Pages.ProblemsPage);
      navigate("/problems");
    };

    if (user.username === room.personOne) {
      socket.emit("joinRoom", {
        roomDifficulty: room.difficulty,
        roomId: room.roomId,
        userOne: room.personOne,
        userTwo: room.personTwo,
      });
      // socket.emit("sendStream", { peerId: me.id, roomId: room.roomId });
    }

    socket.on("question", (questionData) => {
      setQuestion({
        ...question,
        title: questionData.questionTitle,
        data: questionData.question,
      });
      console.log("WHERE QN", questionData);
    });

    socket.on("receiveStream", ({ peerId }) => {
      const call = me.call(peerId, myStream);
      call.on("stream", (peerStream) => {
        console.log(peerStream);
        setMyPeerStream(peerStream);
      });
    });

    me.on("call", (call) => {
      call.answer(myStream);
      call.on("stream", (peerStream) => {
        console.log(peerStream);
        setMyPeerStream(peerStream);
      });
    });

    socket.on("togglePeerStream", ({ showStream }) => {
      setIsShowingPeerStream(showStream);
    });
  }, []);

  const handleVideoToggle = () => {
    socket.emit("togglePeerStream", {
      roomId: room.roomId,
      showStream: !isShowingMyStream,
    });
    if (!isShowingMyStream) {
      socket.emit("sendStream", {
        peerId: me.id,
        roomId: room.roomId,
      });
    }
    setIsShowingMyStream(!isShowingMyStream);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header__wrapper}>
          <div className={styles.header__details}>
            <BodyCopy>Users: {room.personOne + ", " + room.personTwo}</BodyCopy>
            <BodyCopy>Difficulty: {room.difficulty}</BodyCopy>
          </div>
          <div className={styles.header__buttons}>
            <div className={styles.header__leave}>
              <LinkText
                style={{ width: "100%" }}
                text={"Leave Room"}
                onClick={() => setPage(Pages.ProblemsPage)}
              />
            </div>
            {/* <div className={styles.header__submit}>
              <SecondaryButton text={"submit"} />
            </div> */}
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.question__wrapper}>
            <BodyCopyLarge>{question.title}</BodyCopyLarge>
            <div
              className={styles.question__data}
              dangerouslySetInnerHTML={{ __html: question.data }}
            />
          </div>
          <div className={styles.rightSide__wrapper}>
            <div className={styles.rightSide__code}>
              <CodeEditor socket={socket} roomId={room.roomId} />
            </div>
            <div className={styles.rightSide__videos}>
              <div className={`${styles[`rightSide__video`]}`}>
                {isShowingMyStream && <VideoPlayer stream={myStream} />}
                <div className={styles.rightSide__label}>
                  <BodyCopy text={user.username} style={{ margin: 0 }} />
                </div>
                {!isShowingMyStream ? (
                  <LinkText onClick={handleVideoToggle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      Start
                      <div style={{ marginLeft: "3px" }}>
                        <VideoIcon color={"#a287f4"} />
                      </div>
                    </div>
                  </LinkText>
                ) : (
                  <div
                    onClick={handleVideoToggle}
                    className={styles.rightSide__icon}
                  >
                    <VideoOffIcon color={"black"} />
                  </div>
                )}
              </div>
              <div className={`${styles[`rightSide__video`]}`}>
                {isShowingPeerStream && (
                  <PeerVideoPlayer stream={myPeerStream} />
                )}
                <div className={styles.rightSide__label}>
                  <BodyCopy style={{ margin: 0 }}>
                    {user.username === room.personOne
                      ? room.personTwo
                      : room.personOne}
                  </BodyCopy>
                </div>
                {!isShowingPeerStream && <VideoOffIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
