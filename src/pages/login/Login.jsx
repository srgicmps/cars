import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/"); // Redirige a inicio después del login
		} catch (err) {
			setError("Error al iniciar sesión: " + err.message);
		}
	};

	const signInGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
				<input
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="w-full p-2 mb-4 border border-gray-300 rounded"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={login}>
					Login
				</button>
				<button
					className="w-full p-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
					onClick={signInGoogle}
				>
					Login with Google
				</button>
			</div>
		</div>
	);
}
