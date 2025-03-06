import { Link } from "react-router-dom";

export default function CarCard({ coche }) {
	// Función para mostrar el icono apropiado según el tipo de combustible
	const renderFuelIcon = (combustible) => {
		switch (combustible?.toLowerCase()) {
			case "gasolina":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-7 5-7-5m14 6l-7 5-7-5" />
					</svg>
				);
			case "diesel":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
					</svg>
				);
			case "eléctrico":
			case "electrico":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				);
			case "híbrido":
			case "hibrido":
			case "híbrido enchufable":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

	// Función para mostrar el icono de transmisión
	const renderTransmissionIcon = (transmision) => {
		switch (transmision?.toLowerCase()) {
			case "manual":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
					</svg>
				);
			case "automática":
			case "automatica":
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
						/>
					</svg>
				);
			default:
				return (
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

	return (
		<Link to={`/tema/${coche.id}`} className="block transform hover:scale-102 transition-all duration-300">
			<div className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 h-full flex flex-col">
				{/* Imagen y precio */}
				<div className="h-48 overflow-hidden relative">
					{coche.imageUrl ? (
						<img
							src={coche.imageUrl}
							alt={`${coche.marca} ${coche.modelo}`}
							className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = "https://via.placeholder.com/400x300?text=Sin+imagen";
							}}
						/>
					) : (
						<div className="bg-gray-200 h-full w-full flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-12 w-12 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
					)}
					<div className="absolute top-3 right-3">
						<span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">{coche.precio}€</span>
					</div>
				</div>

				{/* Información y especificaciones */}
				<div className="p-5 flex-grow flex flex-col">
					{/* Marca, modelo y año */}
					<div className="mb-3">
						<h2 className="text-xl font-bold text-gray-800 mb-1">
							{coche.marca} {coche.modelo}
						</h2>
						<div className="flex items-center justify-between">
							<p className="text-gray-600 flex items-center text-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 mr-1"
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
								{coche.año}
							</p>
							{coche.color && <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">{coche.color}</span>}
						</div>
					</div>

					{/* Especificaciones técnicas principales */}
					<div className="grid grid-cols-2 gap-2 my-2 bg-gray-50 p-2.5 rounded-lg">
						{coche.combustible && (
							<div className="flex items-center text-sm text-gray-700">
								{renderFuelIcon(coche.combustible)}
								<span className="ml-1.5 whitespace-nowrap overflow-hidden text-ellipsis">{coche.combustible}</span>
							</div>
						)}

						{coche.transmision && (
							<div className="flex items-center text-sm text-gray-700">
								{renderTransmissionIcon(coche.transmision)}
								<span className="ml-1.5 whitespace-nowrap overflow-hidden text-ellipsis">{coche.transmision}</span>
							</div>
						)}

						{coche.potencia && (
							<div className="flex items-center text-sm text-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
								<span className="ml-1.5">{coche.potencia} CV</span>
							</div>
						)}

						{coche.kilometraje && (
							<div className="flex items-center text-sm text-gray-700">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
									/>
								</svg>
								<span className="ml-1.5">{coche.kilometraje} km</span>
							</div>
						)}
					</div>

					{/* Descripción y enlace */}
					<div className="border-t border-gray-100 pt-3 mt-auto">
						<p className="text-gray-700 text-sm line-clamp-2">{coche.descripcion}</p>
						<div className="flex justify-end items-center mt-3">
							<span className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm">
								Ver detalles
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 ml-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
