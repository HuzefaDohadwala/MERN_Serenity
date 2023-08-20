import "./App.css";
import Navbar from "./components/Navbar";
import Home1 from "./components/Home1";
import Home2 from "./components/Home2";
import Home3 from "./components/Home3";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home1></Home1>
      <Home2></Home2>
      <Home3></Home3>
    </div>
  );
}

export default App;
