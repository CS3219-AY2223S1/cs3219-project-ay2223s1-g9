import CodeEditor from "@uiw/react-textarea-code-editor";
import { useEffect, useState } from "react";

const Editor = ({ socket, roomId }) => {
  const [code, setCode] = useState(
    `function soln(x) {\n  //type your soln here\n}`
  );
  const [isTyping, setIsTyping] = useState(false);
  document.documentElement.setAttribute("data-color-mode", "dark");

  useEffect(() => {
    socket.on("updateCode", (updatedCode) => {
      setCode(updatedCode);
      setIsTyping(false);
    });
  });

  useEffect(() => {
    if (isTyping) {
      socket.emit("writeCode", { roomId, code });
    }
  }, [code]);

  const handleChange = (evn) => {
    setCode(evn.target.value);
    setIsTyping(true);
  };

  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Type solution here"
      onChange={handleChange}
      padding={15}
      rows={100}
      style={{
        fontSize: 14,
        backgroundColor: "#353535",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        height: "100%",
        width: "100%",
      }}
    />
  );
};
export default Editor;
