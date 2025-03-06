import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function Navbar() {
	// estat per controlar si es menu mobil esta obert o tancat
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	// funcio per saber si un cami esta actiu comparant amb sa ruta actual
	const isActive = (path) => {
		return location.pathname === path;
	};
	return (
		// sa barra de navegacio amb un poc de sombra i fixed a dalt de tot
		<nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center space-x-3">
						{/* dibuix d'un cotxu en color blau */}
						<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
							<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
							<path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-6a1 1 0 00-.3-.7l-3-3A1 1 0 0017 3H3z" />
						</svg>
						<span className="font-bold text-xl text-gray-800">caReact</span>
					</Link>

					<div className="hidden md:flex items-center space-x-1">
						{/* enllaç cap a sa pagina principal, canvia de color si esta activa */}
						<Link
							to="/"
							className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
								isActive("/") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
							}`}
						>
							Inicio
						</Link>
						{/* enllaç per afegir un vehicul nou, canvia de color si esta activa */}
						<Link
							to="/formulario"
							className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
								isActive("/formulario") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
							}`}
						>
							Añadir Vehículo
						</Link>

						{/* barra de search amb un poc de margin a s'esquerre */}
						<div className="ml-4">
							<Searchbar />
						</div>
					</div>

					{/* links per iniciar sesio i registrarse (actualment comentats) */}
					{/* <div className="hidden md:flex items-center space-x-3">
                        <Link
                            to="/login"
                            className="text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to="/registro"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                        >
                            Crear Cuenta
                        </Link>
                    </div> */}

					{/* boto del menu hamburguese que només apareix en pantalles petites */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-gray-700 hover:text-blue-600 focus:outline-none"
						>
							{isMobileMenuOpen ? (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div className="md:hidden py-3 border-t border-gray-100">
						<div className="flex flex-col space-y-2 pb-3">
							<Link
								to="/"
								className={`px-3 py-2 rounded-md text-base font-medium ${
									isActive("/") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
								}`}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Inicio
							</Link>
							<Link
								to="/formulario"
								className={`px-3 py-2 rounded-md text-base font-medium ${
									isActive("/formulario") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
								}`}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Añadir Vehículo
							</Link>
						</div>
						<div className="pt-4 pb-2 border-t border-gray-100">
							<div className="my-3 px-3">
								<Searchbar />
							</div>
							{/* botons per iniciar sesio i registrarse (actualment comentats) */}
							{/* <div className="flex flex-col space-y-2 mt-3">
                                <Link
                                    to="/login"
                                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/registro"
                                    className="px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Crear Cuenta
                                </Link>
                            </div> */}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
