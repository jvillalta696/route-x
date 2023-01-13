import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NotFoud from "./pages/NotFoud";
import { client } from "./backend/supabase/client";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "./contexts/AuthContext";

function App() {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
  //console.log(auth)
  }, [navigate]);
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoud />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
