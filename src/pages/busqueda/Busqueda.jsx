import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Busqueda() {
	const [searchParams] = useSearchParams();
	const [resultados, setResultados] = useState([]);
	const searchTerm = searchParams.get("q") || "";

	useEffect(() => {
		const buscarTemas = async () => {
			try {
				const temasRef = collection(db, "temas");
				const querySnapshot = await getDocs(temasRef);
				const resultados = querySnapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					.filter((tema) => tema.marca.toLowerCase().includes(searchTerm.toLowerCase()));
				setResultados(resultados);
			} catch (error) {
				console.error("Error en la búsqueda:", error);
			}
		};

		if (searchTerm) {
			buscarTemas();
		}
	}, [searchTerm]);

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Resultados para: {searchTerm}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{resultados.map((tema) => (
					<Link to={`/tema/${tema.id}`} key={tema.id}>
						<div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
							<div className="p-6">
								<div className="flex justify-between items-start mb-4">
									<div>
										<h2 className="text-2xl font-bold text-gray-800">
											{tema.marca} {tema.modelo}
										</h2>
										<p className="text-gray-600">Año: {tema.año}</p>
									</div>
									<span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
										{tema.precio}€
									</span>
								</div>
								<p className="text-gray-700 line-clamp-2">{tema.descripcion}</p>
							</div>
						</div>
					</Link>
				))}
				{resultados.length === 0 && searchTerm && (
					<p className="text-gray-500 col-span-3 text-center">No se encontraron resultados</p>
				)}
			</div>
		</div>
	);
}
