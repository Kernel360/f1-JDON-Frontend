import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Info from "./pages/InFo";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
