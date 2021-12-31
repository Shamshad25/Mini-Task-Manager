import React from "react";
import Create from "./components/Create";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import ListTask from "./components/ListTask";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path='/' element={<ListTask />} />
      </Routes>
    </Router>
  );
}

export default App;
