import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginform from './components/Login_Form.tsx';
import Registerform from './components/Register_Form.tsx'
import Home from "./components/Home.tsx";
import { Protected, Protect } from "./protectedroute.tsx";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protect><Loginform /></Protect>} />
          <Route path="/register" element={<Protect><Registerform /></Protect>} />
          <Route path="/home" element={<Protected><Home /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
