import { auth, googleProvider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// const [photoURL, setPhotoURL] = useState("");

	// console.log(photoURL);

	const signIn = async () => {
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

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
			<input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
			<button onClick={signIn}>Sign in</button>
			<button onClick={signInGoogle}>Sign in with Google</button>
			<button onClick={logout}>Logout</button>
			<div>
				<img src={auth?.currentUser?.photoURL} alt="User Profile" />
				<p>{auth?.currentUser?.displayName}</p>
			</div>
		</div>
	);
};
