import "./App.css";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Discover from "./components/Discover";
import Login from "./components/Login";
import ListLanding from "./components/listener/ListLanding";
// import MemLanding from "./components/member/MemLanding";
import SignUp from "./components/SignUp";
import Welcome from "./components/member/Welcome";
import ListenerSignup from "./components/listener/ListSignup";
import ListLogin from "./components/listener/ListLogin";
import ChatRoom from "./components/ChatRoom";
import MemMemes from "./components/member/pages/MemMemes";
import MemTherapists from "./components/member/pages/MemTherapists";
import MemExplore from "./components/member/pages/MemExplore";
import DashBoard from "./components/member/DashBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member/landing" element={<DashBoard/>} />
        <Route path="/listener/signup" element={<ListenerSignup />} />
        <Route path="/listener/login" element={<ListLogin />} />
        <Route path="/listener/landing" element={<ListLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/member/landing" element={<MemLanding />} /> */}
        <Route path="/user" element={<Welcome />} />
        <Route path="/chat/:roomName" element={<ChatRoom />} />
        <Route path="/member/Memes" element={<MemMemes />} />
        <Route path="/member/Therapists" element={<MemTherapists />} />
        <Route path="/member/Explore" element={<MemExplore />} />
      </Routes>
    </div>
  );
}

export default App;
