import React from "react";
import SignUp from "./Component/SignUp";
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom';
import HomePage from "./Component/HomePage";
import SignupForm from "./Component/SignUpForm";
function App() {
  return (
  <BrowserRouter>
      <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signupform" element={<SignupForm/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
