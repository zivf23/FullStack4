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

function Root() {
  return <RichEditorScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}