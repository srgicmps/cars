import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		navigate(`/busqueda?q=${searchTerm}`);
	};

	return (
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
