import "./App.css";
import Characters from "./components/Characters/Characters";
import ToDo from "./components/ToDo/ToDo";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="todo" element={<ToDo />} />
      </Routes>
    </div>
  );
}

export default App;
