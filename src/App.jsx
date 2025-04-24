import React, { useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import FileManager from "./components/FileManager";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./index.css";

function Shell() {
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
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}




// import React, { useState, useEffect } from "react";
// import Editor from "./components/Editor";
// import Preview from "./components/Preview";
// import FileManager from "./components/FileManager";
// import Login from "./components/Login";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import "./index.css";

// function Shell() {
//   const { user } = useAuth();
//   // --- App‑level state ---
//   const [text, setText] = useState("");              // Active document content (Part A)
//   const [filename, setFilename] = useState(null);     // Active filename (Part B)

//   // future: const [docs, setDocs] = useState([]);    // <-- Part C placeholder

//   if (!user) return <Login />; // Part D – basic username login

//   return (
//     <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">
//       {/* Preview on top */}
//       <Preview text={text} />

//       {/* Editor & toolbar on bottom */}
//       <div className="flex-grow flex flex-col gap-2">
//         <Editor value={text} onChange={setText} />
//         <FileManager
//           text={text}
//           setText={setText}
//           filename={filename}
//           setFilename={setFilename}
//         />
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Shell />
//     </AuthProvider>
//   );
// }
