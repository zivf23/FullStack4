import React from "react";
import { AuthProvider, useAuth  } from "./contexts/AuthContext";
import "./index.css";
import "./App.css";
import RichEditorScreen from "./components/RichEditorScreen";
import Login from "./components/Login";

function Root() {
  const { user } = useAuth();
  
  return user ? <RichEditorScreen /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}