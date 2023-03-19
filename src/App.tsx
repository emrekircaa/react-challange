import "./App.scss";
import { Routes, Route } from "react-router-dom";
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
      </Routes>
    </div>
  );
}

export default App;
