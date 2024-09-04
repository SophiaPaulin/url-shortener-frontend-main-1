import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateUrlShortner from "./components/CreateUrlShortner";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import UrlTableData from "./components/UrlTableData";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

	const handleLogin = () => setIsLoggedIn(true);
	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

	return (
		<Router>
			<div className="App">
				<ToastContainer />
				<Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login handleLogin={handleLogin} />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/urlshortner" element={<UrlTableData />} />
					<Route path="/urlshortner/create" element={<CreateUrlShortner />} />
					<Route path="/" element={<Login handleLogin={handleLogin} />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
