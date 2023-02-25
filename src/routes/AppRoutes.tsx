import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import { GlobalStyled } from '../theme/GlobalStyled';

const AppRoutes = () => {
	return (
		<>
			<GlobalStyled />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/Signup" element={<Signup />} />
					<Route path="/Home" element={<Home />} />
					<Route path="*" element={<h1>Not Found</h1>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default AppRoutes;
