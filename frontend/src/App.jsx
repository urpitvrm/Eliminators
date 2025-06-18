import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Footer from "./pages/Footer";
import Home from "./pages/Home";
import StudentDetails from "./pages/StudentDetails";
import Register from "./pages/Register";
import UpdateStudent from "./pages/UpdateStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/update/:id" element={<UpdateStudent/>}/>
      </Routes>
    </Router>
  );
}

export default App;
