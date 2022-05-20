import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Github from "./Components/github";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Github />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
