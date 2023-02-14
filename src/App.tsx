import { useRef } from "react";
import * as monaco from "monaco-editor";
import Editor, { OnMount } from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

function App() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // init Yjs
    const doc = new Y.Doc(); // a collection of shared object => Text
    // Connect to peers with WebRtc
    const provider = new WebrtcProvider("testroom", doc);
    const type = doc.getText("monaco"); // doc {monaco: "the content in IDE"}
    // Bind YJS to Monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel()!,
      new Set([editorRef.current]),
      provider.awareness
    );
  };

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      language="javascript"
      onMount={handleEditorDidMount}
    />
  );
}

export default App;
