import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Tema() {
	const [tema, setTema] = useState(null);
	const [loading, setLoading] = useState(true);
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
			} finally {
				setLoading(false);
			}
		};
		getTema();
	}, [id]);

	const handleDelete = async () => {
		if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
			try {
				await deleteDoc(doc(db, "temas", id));
				navigate("/");
			} catch (error) {
				console.error("Error al eliminar:", error);
			}
		}
	};

	const renderFuelIcon = (combustible) => {
		switch (combustible?.toLowerCase()) {
			case "gasolina":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-7 5-7-5m14 6l-7 5-7-5" />
					</svg>
				);
			case "diesel":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
					</svg>
				);
			case "eléctrico":
			case "electrico":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				);
			case "híbrido":
			case "hibrido":
			case "híbrido enchufable":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				);
			case "glp":
			case "gnc":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9.879 16.121A3 3 0 1012.015 11.1c.6.392.6.98.6 1.58s-.01 1.188-.6 1.58"
						/>
					</svg>
				);
			default:
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen bg-gray-50">
				<div className="animate-pulse flex flex-col items-center">
					<div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
					<p className="text-lg text-gray-700 font-medium">Cargando información del vehículo...</p>
				</div>
			</div>
		);
	}

	if (!tema) {
		return (
			<div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
				<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-16 w-16 mx-auto text-red-500 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Vehículo no encontrado</h2>
					<p className="text-gray-600 mb-6">No pudimos encontrar la información de este vehículo</p>
					<button
						onClick={() => navigate("/")}
						className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors w-full"
					>
						Volver al catálogo
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gray-50 min-h-screen py-8 px-4">
			<div className="max-w-5xl mx-auto">
				<button onClick={() => navigate("/")} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Volver al catálogo
				</button>

				<div className="bg-white shadow-lg rounded-xl overflow-hidden">
					{tema.imageUrl ? (
						<div className="w-full h-80 md:h-96 overflow-hidden">
							<img
								src={tema.imageUrl}
								alt={`${tema.marca} ${tema.modelo}`}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = "https://via.placeholder.com/800x400?text=Imagen+no+disponible";
								}}
							/>
						</div>
					) : (
						<div className="bg-gradient-to-r from-blue-600 to-blue-800 h-48 md:h-64 flex items-center justify-center">
							<span className="text-white text-xl font-medium">Sin imagen disponible</span>
						</div>
					)}

					<div className="p-6 md:p-8">
						<div className="flex flex-wrap justify-between items-start mb-8 gap-4">
							<div>
								<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
									{tema.marca} {tema.modelo}
								</h1>
								<div className="flex flex-wrap items-center gap-4 text-gray-600">
									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-blue-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										<span className="font-medium">{tema.año}</span>
									</div>

									{tema.color && (
										<div className="flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 mr-2 text-blue-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
												/>
											</svg>
											<span>{tema.color}</span>
										</div>
									)}
								</div>
							</div>
							<span className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-md">{tema.precio}€</span>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							{tema.combustible && (
								<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
									<div className="flex justify-center mb-2 text-blue-600">{renderFuelIcon(tema.combustible)}</div>
									<h3 className="font-medium text-gray-700 mb-1">Combustible</h3>
									<p className="text-gray-900 font-semibold">{tema.combustible}</p>
								</div>
							)}

							{tema.transmision && (
								<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
									<div className="flex justify-center mb-2 text-blue-600">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
											/>
										</svg>
									</div>
									<h3 className="font-medium text-gray-700 mb-1">Transmisión</h3>
									<p className="text-gray-900 font-semibold">{tema.transmision}</p>
								</div>
							)}

							{tema.potencia && (
								<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
									<div className="flex justify-center mb-2 text-blue-600">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
										</svg>
									</div>
									<h3 className="font-medium text-gray-700 mb-1">Potencia</h3>
									<p className="text-gray-900 font-semibold">{tema.potencia} CV</p>
								</div>
							)}

							{tema.kilometraje && (
								<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
									<div className="flex justify-center mb-2 text-blue-600">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
											/>
										</svg>
									</div>
									<h3 className="font-medium text-gray-700 mb-1">Kilometraje</h3>
									<p className="text-gray-900 font-semibold">{tema.kilometraje} km</p>
								</div>
							)}
						</div>

						<div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
							<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2 text-blue-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
									/>
								</svg>
								Especificaciones técnicas
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{tema.carroceria && (
									<div className="flex items-center bg-white p-3 rounded-md border border-gray-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-blue-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 4H5a2 2 0 00-2 2v4h18V6a2 2 0 00-2-2zm0 0v12a2 2 0 01-2 2H7a2 2 0 01-2-2v-6"
											/>
										</svg>
										<div>
											<p className="text-xs text-gray-500">Carrocería</p>
											<p className="font-medium">{tema.carroceria}</p>
										</div>
									</div>
								)}

								{tema.puertas && (
									<div className="flex items-center bg-white p-3 rounded-md border border-gray-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-blue-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
										</svg>
										<div>
											<p className="text-xs text-gray-500">Puertas</p>
											<p className="font-medium">{tema.puertas}</p>
										</div>
									</div>
								)}

								{tema.traccion && (
									<div className="flex items-center bg-white p-3 rounded-md border border-gray-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-blue-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
											/>
										</svg>
										<div>
											<p className="text-xs text-gray-500">Tracción</p>
											<p className="font-medium">{tema.traccion}</p>
										</div>
									</div>
								)}

								{tema.cilindrada && (
									<div className="flex items-center bg-white p-3 rounded-md border border-gray-100">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-blue-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
											/>
										</svg>
										<div>
											<p className="text-xs text-gray-500">Cilindrada</p>
											<p className="font-medium">{tema.cilindrada} cc</p>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="bg-white p-6 rounded-lg mb-8 border border-gray-200">
							<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2 text-blue-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Descripción
							</h2>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">
								{tema.descripcion || "No hay descripción disponible para este vehículo."}
							</p>
						</div>

						<div className="flex flex-wrap gap-4">
							<button
								onClick={() => navigate(`/formulario/${tema.id}`)}
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex-1 md:flex-none flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
								Editar vehículo
							</button>
							<button
								onClick={handleDelete}
								className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors flex-1 md:flex-none flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
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
								Eliminar
							</button>
							<button
								onClick={() => window.history.back()}
								className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors flex-1 md:flex-none flex items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								Volver
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
