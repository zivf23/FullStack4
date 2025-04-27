// import Preview from "./components/Preview";	
// import Editor from "./components/Editor";
// import FileManager from "./components/FileManager";	
// import Keyboard from "./components/Keyboard";	
import React from "react";
// import FileManager from "./components/FileManager";
// import Login from "./components/Login";
import { AuthProvider  } from "./contexts/AuthContext";
import "./index.css";
import "./App.css";
import RichEditorScreen from "./components/RichEditorScreen";


// אין שימוש ב-"של" אז שמתי את זה בהערה
/* function Shell() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [filename, setFilename] = useState(null);
  if (!user) return <Login />;
  return (
    <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">
      <Preview text={text} />
      <div className="flex-grow flex flex-col gap-2">
        <Editor value={text} onChange={setText} />
        <FileManager
          text={text}
          setText={setText}
          filename={filename}
          setFilename={setFilename}
        />
      </div>
    </div>
  );
} */

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
