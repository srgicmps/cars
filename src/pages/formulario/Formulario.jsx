import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Formulario() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [coche, setCoche] = useState({
		marca: "",
		modelo: "",
		año: "",
		descripcion: "",
		precio: "",
	});

	useEffect(() => {
		if (id) {
			const getCoche = async () => {
				try {
					const docRef = doc(db, "temas", id);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						setCoche(docSnap.data());
					}
				} catch (error) {
					setError("Error al cargar el coche: " + error.message);
				}
			};
			getCoche();
		}
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (id) {
				await updateDoc(doc(db, "temas", id), coche);
			} else {
				await addDoc(collection(db, "temas"), coche);
			}
			navigate("/");
		} catch (error) {
			setError("Error al guardar: " + error.message);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCoche((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			<div className="bg-white shadow-lg rounded-lg p-8">
				<h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
					{id ? "Editar Coche" : "Añadir Nuevo Coche"}
				</h2>

				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
						<p className="text-red-700">{error}</p>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
							<input
								type="text"
								name="marca"
								value={coche.marca}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								required
								placeholder="Ej: BMW"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
							<input
								type="text"
								name="modelo"
								value={coche.modelo}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								required
								placeholder="Ej: Serie 3"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
							<input
								type="number"
								name="año"
								value={coche.año}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								required
								placeholder="Ej: 2024"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
							<div className="relative">
								<input
									type="number"
									name="precio"
									value={coche.precio}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pl-7"
									required
									placeholder="Ej: 30000"
								/>
								<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
									€
								</span>
							</div>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
						<textarea
							name="descripcion"
							value={coche.descripcion}
							onChange={handleChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
							rows="4"
							required
							placeholder="Describe las características del vehículo..."
						></textarea>
					</div>

					<div className="flex gap-4 pt-4">
						<button
							type="submit"
							className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
						>
							{id ? "Guardar Cambios" : "Añadir Coche"}
						</button>
						<button
							type="button"
							onClick={() => navigate("/")}
							className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700"
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
