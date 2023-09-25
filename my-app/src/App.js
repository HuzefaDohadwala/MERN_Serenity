import "./App.css";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Discover from "./components/Discover";
import Login from "./components/Login";
import MemLanding from "./components/member/MemLanding";
import ListLanding from "./components/listener/ListLanding";
// import MemLanding from "./components/member/MemLanding";
import SignUp from "./components/SignUp";
import Welcome from './components/member/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member/landing" element={<MemLanding />} />
        <Route path="/listener/landing" element={<ListLanding />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        {/* <Route path="/member/landing" element={<MemLanding />} /> */}
        <Route path="/user" element={<Welcome/> }/>
      </Routes>
    </div>
  );
}

export default App;
