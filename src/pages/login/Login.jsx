import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Por favor, introduce email y contraseña");
			return;
		}

		setLoading(true);
		setError("");

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (err) {
			const errorMap = {
				"auth/invalid-credential": "Email o contraseña incorrectos",
				"auth/user-not-found": "No existe un usuario con este email",
				"auth/wrong-password": "Contraseña incorrecta",
				"auth/too-many-requests": "Demasiados intentos fallidos. Inténtalo más tarde",
			};
			setError(errorMap[err.code] || "Error al iniciar sesión: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const signInGoogle = async () => {
		setLoading(true);
		setError("");

		try {
			await signInWithPopup(auth, googleProvider);
			navigate("/");
		} catch (err) {
			if (err.code !== "auth/popup-closed-by-user") {
				setError("Error al iniciar sesión con Google");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-full bg-gradient-to-br from-blue-50 to-gray-100">
			<div className="m-auto max-w-md w-full px-4 py-8">
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white text-center">
						<div className="inline-flex justify-center items-center bg-white/20 p-3 rounded-full mb-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold mb-1">¡Bienvenido de nuevo!</h2>
						<p className="text-blue-100">Inicia sesión para continuar</p>
					</div>

					<div className="p-6">
						{error && (
							<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
								<p className="text-sm text-red-700">{error}</p>
							</div>
						)}

						<form onSubmit={login} className="space-y-4">
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
									Correo electrónico
								</label>
								<input
									id="email"
									type="email"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="tu@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div>
								<div className="flex items-center justify-between mb-1">
									<label htmlFor="password" className="block text-sm font-medium text-gray-700">
										Contraseña
									</label>
									<a href="#" className="text-xs text-blue-600 hover:text-blue-800">
										¿Olvidaste tu contraseña?
									</a>
								</div>
								<input
									id="password"
									type="password"
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							<button
								type="submit"
								disabled={loading}
								className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
									loading ? "opacity-70 cursor-not-allowed" : ""
								}`}
							>
								{loading ? (
									<div className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Iniciando sesión...
									</div>
								) : (
									"Iniciar sesión"
								)}
							</button>
						</form>

						<div className="flex items-center my-6">
							<div className="flex-grow border-t border-gray-200"></div>
							<span className="flex-shrink mx-4 text-gray-400 text-sm">o continúa con</span>
							<div className="flex-grow border-t border-gray-200"></div>
						</div>

						<button
							onClick={signInGoogle}
							disabled={loading}
							className={`w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
								loading ? "opacity-70 cursor-not-allowed" : ""
							}`}
						>
							<svg
								className="h-5 w-5 mr-2"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
									<path
										fill="#4285F4"
										d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
									/>
									<path
										fill="#34A853"
										d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
									/>
									<path
										fill="#FBBC05"
										d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
									/>
									<path
										fill="#EA4335"
										d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
									/>
								</g>
							</svg>
							Continuar con Google
						</button>
						<p className="mt-6 text-center text-sm text-gray-600">
							¿No tienes una cuenta?{" "}
							<Link to="/registro" className="font-medium text-blue-600 hover:text-blue-800">
								Regístrate ahora
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
