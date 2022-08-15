import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Create from "./pages/Create";
import PrivateRoute from "./components/PrivateRoute";
import Refunds from "./pages/Refunds";
import Refund from "./pages/Refund";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<PrivateRoute />}>
              <Route path="/create" element={<Create />} />
            </Route>
            <Route path="/refunds" exact element={<PrivateRoute />}>
              <Route path="/refunds" exact element={<Refunds />} />
            </Route>
            <Route path="/refund/:refundId" element={<PrivateRoute />}>
              <Route path="/refund/:refundId" element={<Refund />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
