import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import NavigationBar from './nav';
import Homescreen from './home.js';
import Favorite from './views/favorites'
import Login from './views/login';
import Signup from './views/signup';
import Music from './views/music';


export default  function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
          <Routes>
            <Route exact path="/" element={<Homescreen />}></Route>
            <Route exact path="/favorite" element={<Favorite />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/newsignup" element={<Signup />}></Route>
            <Route exact path="/music" element={<Music />}></Route>
          </Routes>
        </BrowserRouter>
  );
}

