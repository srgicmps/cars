import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Tema() {
	const [tema, setTema] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getTema = async () => {
			try {
				const docRef = doc(db, "temas", id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setTema({ id: docSnap.id, ...docSnap.data() });
				}
			} catch (error) {
				console.error("Error al obtener el tema:", error);
			}
		};
		getTema();
	}, [id]);

	const handleDelete = async () => {
		try {
			await deleteDoc(doc(db, "temas", id));
			navigate("/");
		} catch (error) {
			console.error("Error al eliminar:", error);
		}
	};

	if (!tema) return <div className="text-center py-10">Cargando...</div>;

	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="bg-white shadow-md rounded-lg p-6">
				<div className="flex justify-between items-start mb-6">
					<div>
						<h1 className="text-3xl font-bold mb-2">
							{tema.marca} {tema.modelo}
						</h1>
						<p className="text-gray-600">Año: {tema.año}</p>
					</div>
					<span className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg font-bold">
						{tema.precio}€
					</span>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold mb-2">Descripción</h2>
					<p className="text-gray-700">{tema.descripcion}</p>
				</div>

				<div className="flex gap-3">
					<button
						onClick={() => navigate(`/formulario/${tema.id}`)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Editar
					</button>
					<button
						onClick={handleDelete}
						className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Eliminar
					</button>
					<button
						onClick={() => navigate("/")}
						className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
					>
						Volver
					</button>
				</div>
			</div>
		</div>
	);
}
