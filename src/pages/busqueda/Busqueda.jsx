import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import CarCard from "../../components/CarCard";

export default function Busqueda() {
	// agafam es parametres de sa url per sebre que hem de cercar
	const [searchParams] = useSearchParams();
	// guardam es resultats de sa cerque en un estat
	const [resultados, setResultados] = useState([]);
	// control des loading per mostrar sa rodeta de carrega
	const [loading, setLoading] = useState(true);
	// obtenim es parametre q de sa url, si no hi ha re retornam string bujida
	const searchTerm = searchParams.get("q") || "";

	// useEffect per fer sa cerque quan canvia es terme de cerque
	useEffect(() => {
		// funcio asincrona per cercar es cotxos a firebase
		const buscarTemas = async () => {
			try {
				const temasRef = collection(db, "temas");
				const querySnapshot = await getDocs(temasRef);
				const resultados = querySnapshot.docs
					.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					// cercam amb filter en es camp de marca, model i descripcio
					.filter(
						(tema) =>
							tema.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
							tema.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
							tema.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
					);
				// actualitzam
				setResultados(resultados);
			} catch (error) {
				console.error("Error en la búsqueda:", error);
			} finally {
				setLoading(false);
			}
		};

		if (searchTerm) {
			buscarTemas();
		} else {
			setLoading(false);
		}
	}, [searchTerm]); // cada vegada que sa cerqui actualitzam es tema

	// mentres esteim cerquent, mostram un indicador de carrega bastant simple i reutilitzable gracies a tailwind
	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-pulse flex flex-col items-center">
					<div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
					<p className="text-lg text-gray-700 font-medium">Buscando...</p>
				</div>
			</div>
		);
	}

	// si s'ha acabat sa carrega, mostram es resultas
	return (
		<div className="bg-gray-50 min-h-screen py-10">
			<div className="container mx-auto px-4">
				<header className="text-center mb-12">
					<h2 className="text-4xl font-extrabold text-gray-800 mb-2">Resultados para: {searchTerm}</h2>
				</header>

				{resultados.length === 0 ? (
					<div className="text-center py-16 bg-white rounded-lg shadow-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-16 w-16 mx-auto text-gray-400 mb-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<p className="text-xl text-gray-500">No se encontraron resultados</p>
						<p className="text-gray-400 mt-2">Intenta con otro término de búsqueda</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* per cada resultat, mostram una targeta de cochu */}
						{resultados.map((tema) => (
							<CarCard key={tema.id} coche={tema} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
