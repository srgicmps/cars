// import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Busqueda from "./pages/busqueda/Busqueda";
import Formulario from "./pages/formulario/Formulario";
import Inicio from "./pages/inicio/Inicio";
import Registro from "./pages/registro/Registro";
import Login from "./pages/login/Login";

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<BrowserRouter>
				<nav className="bg-blue-600 p-4 shadow-md">
					<div className="container mx-auto flex justify-between items-center">
						<h1 className="text-white text-2xl font-bold">Coches</h1>
						<div className="space-x-4 flex justify-between items-center">
							<Link className="text-white hover:bg-blue-800 py-2 px-4 rounded" to="/">
								Inici
							</Link>
							<Link className="text-white hover:bg-blue-800 py-2 px-4 rounded" to="/busqueda">
								Busqueda
							</Link>
							<Link className="text-white hover:bg-blue-800 py-2 px-4 rounded" to="/formulario">
								Formulario
							</Link>
							<Link className="text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded" to="/registro">
								Crear Cuenta
							</Link>
							<Link className="text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded" to="/login">
								Iniciar Sesión
							</Link>
						</div>
					</div>
				</nav>
				<Routes>
					<Route path="/" element={<Inicio />} />
					<Route path="/busqueda" element={<Busqueda />} />
					<Route path="/formulario" element={<Formulario />} />
					<Route path="/registro" element={<Registro />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
