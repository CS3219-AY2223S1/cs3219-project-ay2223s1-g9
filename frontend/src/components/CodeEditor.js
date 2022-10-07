import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";

const Editor = ({ code, setCode }) => {
  document.documentElement.setAttribute("data-color-mode", "light");

  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder="Type solution here"
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      rows={100}
      style={{
        fontSize: 14,
        backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        height: "100%",
        width: "100%",
      }}
    />
  );
};
export default Editor;
