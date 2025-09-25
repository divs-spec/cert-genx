import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import DashEvents from "./components/DashEvents";
import DashAddEvent from "./components/DashAddEvent";
import DownloadCert from "./components/DownloadCert";
import DashAbout from "./components/DashAbout";
import NotFound from "./components/NotFound";

function MRouter() {
  return (
    <Routes>
      <Route path="/" element={<Check />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} >
        <Route path="events" element={<DashEvents />} />
        <Route path="add-event" element={<DashAddEvent />} />
        <Route path="settings" element={<DashAbout />} />
      </Route>
      <Route path="download" element={<DownloadCert />} />
      <Route path="*" element={<NotFound />} /> 

    </Routes>
  );
}

function Check() {
  if (document.referrer.endsWith("/download/")) {
    return <Navigate to="download" />;
  } else {
    return <Home />;
  }
}


const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <br />
      <MRouter />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
