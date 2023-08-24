import "./App.css";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Discover from "./components/Discover";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/discover" element={<Discover/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
