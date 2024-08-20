import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Messages from "./components/Messages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/messages" />}
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register open={false} />
              ) : (
                <Navigate to="/messages" />
              )
            }
          />
          <Route
            path="/messages"
            element={isAuthenticated ? <Messages /> : <Navigate to="/login" />}
          />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/messages" : "/login"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
