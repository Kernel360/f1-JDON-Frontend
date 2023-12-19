import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import Info from "./pages/InFo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
