import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

export default function Inicio() {
	const [temas, setTemas] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getTemas = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "temas"));
				const temasData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTemas(temasData);
			} catch (error) {
				console.error("Error al obtener temas:", error);
			} finally {
				setLoading(false);
			}
		};
		getTemas();
	}, []);

	if (loading) {
		return <div className="text-center py-10">Cargando coches...</div>;
	}

	return (
		<div className="container mx-auto px-4">
			<h1 className="text-3xl font-bold mb-6">Catálogo de Coches</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{temas.map((tema) => (
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
								<div className="space-y-2">
									<p className="text-gray-700 line-clamp-2">{tema.descripcion}</p>
									<div className="flex justify-between items-center mt-4">
										<span className="text-gray-500 text-sm">{tema.titulo}</span>
										<span className="text-blue-500 hover:text-blue-600">Ver detalles →</span>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
			{temas.length === 0 && (
				<div className="text-center py-10">
					<p className="text-gray-500">No hay coches disponibles</p>
				</div>
			)}
		</div>
	);
}
