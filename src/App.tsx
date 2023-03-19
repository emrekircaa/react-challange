import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Box from "./screens/Box/Box";
import Fav from "./screens/Fav/Fav";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/box" element={<Box />} />
        <Route path="/fav" element={<Fav />} />
        <Route path="/" element={<Home />} />
        {/* <Redirect to="/not-found" /> */}
      </Routes>
    </div>
  );
}

export default App;
