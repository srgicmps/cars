import List from "../../components/List";

export default function Inicio() {
	return (
		<div className="bg-gray-50 min-h-screen py-10">
			<div className="container mx-auto px-4">
				<header className="text-center mb-12">
					<h1 className="text-4xl font-extrabold text-gray-800 mb-2">Catálogo de Coches</h1>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Descubre nuestra selección de vehículos de alta calidad para todos los gustos y necesidades
					</p>
				</header>

				<List />
			</div>
		</div>
	);
}
