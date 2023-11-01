import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavigationBar from './components/nav';
import Homescreen from './home.js'

export default  function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
          <Routes>
            <Route exact path="/" element={<Homescreen />}></Route>
          </Routes>
        </BrowserRouter>
  );
}

