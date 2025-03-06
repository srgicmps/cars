import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Formulario() {
	// agafam sid de sa url per saber si estam editant un cochuy existent
	const { id } = useParams();
	// navigate per poder enviar s'usuari a una altre pagina quan acabi de guardar
	const navigate = useNavigate();
	// aquesta variable guarda es mensatge d'error si passa alguna cosa
	const [error, setError] = useState("");
	// per mostrar una vista previa de s'imatge des cochu
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	// aqui guardam tota sa informacio des cotxo que estam editant o creant
	const [coche, setCoche] = useState({
		marca: "",
		modelo: "",
		año: "",
		descripcion: "",
		precio: "",
		imageUrl: "",
		combustible: "",
		transmision: "",
		potencia: "",
		puertas: "",
		colores: "",
		traccion: "",
		carroceria: "",
	});

	// quan es component se munta miram si estam editant un cotxo
	useEffect(() => {
		// sin omes tenim jna id singific que esteim editant
		if (id) {
			// cercam es cochu a firebase
			const getCoche = async () => {
				try {
					const docRef = doc(db, "temas", id);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const cocheData = docSnap.data();
						setCoche((prevCoche) => ({
							...prevCoche,
							...cocheData,
						}));
						if (cocheData.imageUrl) {
							setImagePreview(cocheData.imageUrl);
						}
					}
				} catch (error) {
					setError("Error al cargar el coche: " + error.message);
				}
			};
			getCoche();
		}
	}, [id]);

	// funcio que s'executa quan s'envia es formulari
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// llevam es camps buits per no guardar-los a firebase, ho he cercat a google
		const cocheToSave = Object.fromEntries(Object.entries(coche).filter(([_, value]) => value !== ""));

		try {
			if (id) {
				await updateDoc(doc(db, "temas", id), cocheToSave);
			} else {
				await addDoc(collection(db, "temas"), cocheToSave);
			}
			// quan s'ha guardat correctament tornam a sa pagina principal
			navigate("/");
		} catch (error) {
			setError("Error al guardar: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	// funcio per mostrar un error si sa imatge no carrega be
	const handleImagePreviewError = () => {
		setError("La URL de la imagen no es válida. Introduce una URL de imagen correcta.");
		setImagePreview(null);
	};

	// funcio que s'executa cada pic que cambiam cualsevol camp
	const handleChange = (e) => {
		// obtenim es nom des camp i es seu valor
		const { name, value } = e.target;
		// actualitzam es coche amb es nou valor
		setCoche((prev) => ({
			...prev,
			[name]: value,
		}));

		// si estam canviant sa url de s'imatge actualitzam sa vista previa
		if (name === "imageUrl") {
			setImagePreview(value);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="bg-white shadow-lg rounded-lg p-8">
				<h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">{id ? "Editar Coche" : "Añadir Nuevo Coche"}</h2>

				{/* mostram un missatge d'error si n'hi ha */}
				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
						<p className="text-red-700">{error}</p>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<h3 className="text-xl font-semibold text-gray-800 mb-4">Información Básica</h3>
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

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
									<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Colores</label>
								<input
									type="text"
									name="colores"
									value={coche.color}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Ej: Blanco"
								/>
							</div>
						</div>
					</div>

					{/* seccio despecificacionhs tecniques */}
					<div>
						<h3 className="text-xl font-semibold text-gray-800 mb-4 border-t pt-6">Especificaciones Técnicas</h3>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Combustible</label>
								<select
									name="combustible"
									value={coche.combustible}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								>
									<option value="">Seleccionar</option>
									<option value="Gasolina">Gasolina</option>
									<option value="Diesel">Diesel</option>
									<option value="Eléctrico">Eléctrico</option>
									<option value="Híbrido">Híbrido</option>
									<option value="Híbrido Enchufable">Híbrido Enchufable</option>
									<option value="GLP">GLP</option>
									<option value="GNC">GNC</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Transmisión</label>
								<select
									name="transmision"
									value={coche.transmision}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								>
									<option value="">Seleccionar</option>
									<option value="Manual">Manual</option>
									<option value="Automática">Automática</option>
									<option value="Semiautomática">Semiautomática</option>
									<option value="CVT">CVT</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Potencia (CV)</label>
								<input
									type="number"
									name="potencia"
									value={coche.potencia}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Ej: 150"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Puertas</label>
								<select
									name="puertas"
									value={coche.puertas}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								>
									<option value="">Seleccionar</option>
									<option value="3">3</option>
									<option value="5">5</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Carrocería</label>
								<select
									name="carroceria"
									value={coche.carroceria}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								>
									<option value="">Seleccionar</option>
									<option value="Berlina">Berlina</option>
									<option value="Compacto">Compacto</option>
									<option value="SUV">SUV</option>
									<option value="Crossover">Crossover</option>
									<option value="Todoterreno">Todoterreno</option>
									<option value="Coupé">Coupé</option>
									<option value="Cabrio">Cabrio</option>
									<option value="Familiar">Familiar</option>
									<option value="Monovolumen">Monovolumen</option>
									<option value="Pick-Up">Pick-Up</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Tracción</label>
								<select
									name="traccion"
									value={coche.traccion}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								>
									<option value="">Seleccionar</option>
									<option value="Delantera">Delantera</option>
									<option value="Trasera">Trasera</option>
									<option value="4x4">4x4</option>
								</select>
							</div>
						</div>
					</div>

					<div className="border-t pt-6">
						<h3 className="text-xl font-semibold text-gray-800 mb-4">Imagen del Vehículo</h3>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">URL de la imagen</label>
							<input
								type="url"
								name="imageUrl"
								value={coche.imageUrl}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								placeholder="https://ejemplo.com/imagen.jpg"
							/>
							<p className="mt-1 text-xs text-gray-500">Introduce una URL directa a una imagen (jpg, png, webp)</p>

							{imagePreview && (
								<div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
									<img
										src={imagePreview}
										alt="Vista previa"
										className="w-full h-52 object-cover"
										onError={handleImagePreviewError}
									/>
								</div>
							)}
						</div>
					</div>
					<div className="border-t pt-6">
						<h3 className="text-xl font-semibold text-gray-800 mb-4">Descripción</h3>
						<div>
							<textarea
								name="descripcion"
								value={coche.descripcion}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								rows="4"
								required
								placeholder="Describe las características del vehículo, estado, equipamiento adicional, etc."
							></textarea>
						</div>
					</div>

					<div className="flex gap-4 pt-6 border-t">
						<button
							type="submit"
							disabled={loading}
							className={`flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium flex justify-center items-center ${
								loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
							}`}
						>
							{loading ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									{id ? "Guardando..." : "Añadiendo..."}
								</>
							) : (
								<>{id ? "Guardar Cambios" : "Añadir Coche"}</>
							)}
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
