import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
	// feim servir useState per guardar sa paraula de bsuqeuda que escriu s'suarid
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	// funcio que s'executa quan enviam es formulari de busqueda
	const handleSearch = (e) => {
		e.preventDefault();
		// navegam cap a sa pagina de busqueda i li pasam es parametro q amb lo que ha escrrit s'usuari
		navigate(`/busqueda?q=${searchTerm}`);
	};

	return (
		// formulari que quan es fa submit crida sa funcio handleSerch
		<form onSubmit={handleSearch} className="flex gap-2">
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Buscar temas..."
				className="px-4 py-2 border rounded-lg"
			/>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
				Buscar
			</button>
		</form>
	);
}
