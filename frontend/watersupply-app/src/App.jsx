import React, { useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Services from "./pages/Services.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import About from "./pages/About.jsx";
import SignUp from "./component/SignUp.jsx";
import Login from "./component/Login.jsx"
import Chatbot from "./component/Chatbot.jsx";

const App = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <HashRouter>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
