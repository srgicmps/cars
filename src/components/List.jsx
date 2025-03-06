import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import CarCard from "./CarCard";

// component principal per mostrar sa llista de cotxes
export default function List() {
	// etsats per guardar es cotxes i es loading
	const [temas, setTemas] = useState([]);
	const [loading, setLoading] = useState(true);

	// utilitzam useEffect per carregar es cotxes quan es component es munta
	useEffect(() => {
		// Funcio asincrona per obtenir es cotxes de Firestore
		const getTemas = async () => {
			try {
				// Obtenim tots es documents de sa collecsio "temas"
				const querySnapshot = await getDocs(collection(db, "temas"));
				// Transformam ses dades a un format mes facil d'utilitzar
				const temasData = querySnapshot.docs.map((doc) => ({
					id: doc.id, // Afegim s'ID des document
					...doc.data(), // Despleguem tota sa informacio des cotxe
				}));
				// Actualitzam s'estat amb ses dades carregades
				setTemas(temasData);
			} catch (error) {
				// si hi ha un error, el mostram per consola
				console.error("Error al obtenir temas:", error);
			} finally {
				// Tant si va be com si falla, aturam es loading
				setLoading(false);
			}
		};
		// Executam sa funcio per carregar es cotxes
		getTemas();
	}, []); // s array buit vol dir que nomes s'executara una vegada

	// Si encara estam carregant, mostram un indicador de carrega
	if (loading) {
		return (
			<div className="flex justify-center items-center h-full">
				<div className="animate-pulse flex flex-col items-center">
					{/* Cercle que roda per indicar carrega */}
					<div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
					<p className="text-lg text-gray-700 font-medium">Cargando catálogo...</p>
				</div>
			</div>
		);
	}

	// si no hi ha cotxes disponibles, mostram un missatge
	if (temas.length === 0) {
		return (
			<div className="text-center py-16 bg-white rounded-lg shadow-sm">
				{/* Icona de paperera buida */}
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
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
				<p className="text-xl text-gray-500">No hay coches disponibles en este momento</p>
				<p className="text-gray-400 mt-2">Vuelve a intentarlo más tarde</p>
			</div>
		);
	}

	// Si tenim cotxes, els mostram en forma de graella
	return (
		// feim un a graella responsiva que te 1 columna en mobil, 2 en tablet i 3 en pantalles grosses
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{/* Iteram per cada cotxe i el mostram amb es component CarCard */}
			{temas.map((tema) => (
				<CarCard key={tema.id} coche={tema} />
			))}
		</div>
	);
}
