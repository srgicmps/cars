// import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Busqueda from "./pages/busqueda/Busqueda";
import Formulario from "./pages/formulario/Formulario";
import Inicio from "./pages/inicio/Inicio";
import Registro from "./pages/registro/Registro";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Tema from "./pages/tema/Tema";

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<BrowserRouter>
				<Navbar />
				<main className="container mx-auto py-4">
					<Routes>
						<Route path="/" element={<Inicio />} />
						<Route path="/busqueda" element={<Busqueda />} />
						<Route path="/formulario" element={<Formulario />} />
						<Route path="/formulario/:id" element={<Formulario />} />
						<Route path="/registro" element={<Registro />} />
						<Route path="/login" element={<Login />} />
						<Route path="/tema/:id" element={<Tema />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</BrowserRouter>
		</div>
	);
}

export default App;
