import './App.css';
import Loginform from './components/Loginform.tsx';
import Registerform from './components/Registerform.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginform />} />
          <Route path="/register" element={<Registerform />} />
          <Route path="/home" element={<Registerform />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
