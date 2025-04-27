// src/App.jsx
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login             from "./components/Login";
import RichEditorScreen  from "./components/RichEditorScreen";

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
