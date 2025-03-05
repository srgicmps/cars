import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

export default function Navbar() {
	return (
		<nav className="bg-blue-600 p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-white text-2xl font-bold">Coches</h1>
				<div className="space-x-4 flex justify-between items-center">
					<Link className="text-white hover:bg-blue-800 py-2 px-4 rounded" to="/">
						Inicio
					</Link>
					{/* <Link className="text-white hover:bg-blue-800 py-2 px-4 rounded" to="/busqueda">
						Búsqueda
                        </Link> */}
					<Link className="text-white hover:bg-blue-800 py-2 px-4 rounded" to="/formulario">
						Formulario
					</Link>
					<Searchbar />
					<Link className="text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded" to="/registro">
						Crear Cuenta
					</Link>
					<Link className="text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded" to="/login">
						Iniciar Sesión
					</Link>
				</div>
			</div>
		</nav>
	);
}
