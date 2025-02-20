import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { useState } from "react";

export default function Registro() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
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
				<h2 className="text-2xl font-bold mb-4">Crear Cuenta</h2>
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
				<button className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={register}>
					Register
				</button>
				<button
					className="w-full p-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
					onClick={signInGoogle}
				>
					Register with Google
				</button>
			</div>
		</div>
	);
}
