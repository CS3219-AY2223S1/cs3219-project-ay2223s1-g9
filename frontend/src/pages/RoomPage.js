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
import StandardPage from "../components/templates/StandardPage";
import BodyCopy from "../components/atoms/BodyCopy";
import LinkText from "../components/atoms/LinkText";
import styles from "./RoomPage.module.scss";
import SecondaryButton from "../components/atoms/SecondaryButton";
import PrimaryButton from "../components/atoms/PrimaryButton";
import BodyCopyLarge from "../components/atoms/BodyCopyLarge";

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
      setPage(Pages.HomePage);
      navigate("/");
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
      <StandardPage
        headerStyle={{ maxHeight: "100vh" }}
        header={
          <>
            <div className={styles.header__wrapper}>
              <div className={styles.header__details}>
                <BodyCopy>
                  Users: {room.personOne + ", " + room.personTwo}
                </BodyCopy>
                <BodyCopy>Difficulty: {room.difficulty}</BodyCopy>
              </div>
              <div className={styles.header__buttons}>
                <div className={styles.header__leave}>
                  <LinkText
                    style={{ width: "100%" }}
                    text={"Leave Room"}
                    onClick={() => setPage(Pages.HomePage)}
                  />
                </div>
                <div className={styles.header__submit}>
                  <SecondaryButton text={"submit"} />
                </div>
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

                <Button onClick={handleVideoToggle}>clickme</Button>
                <div className={styles.rightSide__videos}>
                  <div className={`${styles[`rightSide__video`]}`}>
                    {isShowingMyStream && <VideoPlayer stream={myStream} />}
                    <div className={styles.rightSide__label}>
                      <BodyCopy text={user.username} style={{ margin: 0 }} />
                    </div>
                  </div>
                  <div className={`${styles[`rightSide__video`]}`}>
                    {isShowingPeerStream && (
                      <VideoPlayer stream={myPeerStream} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      ></StandardPage>

      {/* <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100vh"}
        padding={"1rem"}
        justifyContent={"center"}
        border={"blue 1px solid"}
        sx={{ boxSizing: "border-box" }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"row"}>
            <Typography>Room: </Typography>
            <Typography>{room.roomId}</Typography>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Typography>Users: </Typography>
            <Typography>{room.personOne + ", " + room.personTwo}</Typography>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"row"} flex={1}>
          <Box
            border={"red 1px solid"}
            height={"100%"}
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            padding={"1rem"}
            sx={{ boxSizing: "border-box" }}
            gap={"0.5rem"}
          >
            <Box>{<Typography>Difficulty: {room.difficulty}</Typography>}</Box>
            <Box flex={1}>
              <Typography
                dangerouslySetInnerHTML={{ __html: question.data }}
              ></Typography>
            </Box>
          </Box>
          <Box
            border={"red 1px solid"}
            padding={"1rem"}
            height={"100%"}
            flex={1}
            sx={{ boxSizing: "border-box" }}
          >
            <CodeEditor socket={socket} roomId={room.roomId} />
          </Box>
          <Button onClick={() => setPage(Pages.HomePage)}>
            Go back home page
          </Button>
          <Button
            onClick={(_) => {
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
            }}
          >
            Click me
          </Button>
          {isShowingMyStream && <VideoPlayer stream={myStream} />}
          {isShowingPeerStream && <VideoPlayer stream={myPeerStream} />}
        </Box>
      </Box> */}
    </>
  );
};

export default RoomPage;
