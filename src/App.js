import "./App.css";
import React, { useEffect, useState } from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
import Account from "./components/UserAuth/Account";
import Login from "./components/UserAuth/Login";
import CreateAccount from "./components/UserAuth/CreateAccount";
import LoginOrGuestCheckout from "./components/CheckOut/LoginOrGuestCheckout";
import ShipOptions from "./components/CheckOut/ShipOptions";
import Payment from "./components/CheckOut/Payment";
import Review from "./components/CheckOut/Review";
import CheckoutComplete from "./components/CheckOut/CheckoutComplete";

import firebase from "./components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GeneralAccountInfo from "./components/CheckOut/GeneralAccountInfo";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const App = () => {
	const [cartItems, setCartItems] = useState([]);

	const productsRef = firestore.collection("products");
	const productsQuery = productsRef.orderBy("category", "asc");

	const [products] = useCollectionData(productsQuery, { idField: "id" });
	const [productList, setProductList] = useState([{}]);

	const usersRef = firestore.collection("users");
	const [currentUser, setCurrentUser] = useState("");

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [signUpFirstName, setSignUpFirstName] = useState("");
	const [signUpLastName, setSignUpLastName] = useState("");

	const [errors, setErrors] = useState("");

	const handleChange = (e) => {
		setErrors("");
		if (e.target.type === "email" && e.target.id === "loginEmailInput")
			return setLoginEmail(e.target.value);
		else if (
			e.target.type === "password" &&
			e.target.id === "loginPasswordInput"
		)
			return setLoginPassword(e.target.value);
		else if (e.target.type === "email" && e.target.id === "signUpEmailInput")
			return setSignUpEmail(e.target.value);
		else if (
			e.target.type === "password" &&
			e.target.id === "signUpPasswordInput"
		)
			return setSignUpPassword(e.target.value);
		else if (e.target.id === "firstName")
			return setSignUpFirstName(e.target.value);
		else if (e.target.id === "lastName")
			return setSignUpLastName(e.target.value);
	};

	const addAnonUserToFirestore = async () => {
		const anonUid = localStorage.getItem("uid");
		if (anonUid === null || anonUid === undefined) {
			console.log("dont do anything.");
		} else {
			await usersRef.doc(`${anonUid}`).set({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				userID: anonUid,
				cardNumber: "",
				expirationDate: "",
			});
			await usersRef.doc(`${anonUid}`).collection("cart").add({});
		}
	};

	const loginWithEmail = (e) => {
		e.preventDefault();
		firebaseAuth
			.signInWithEmailAndPassword(loginEmail, loginPassword)
			.catch((error) => {
				setErrors(error);
				console.log(error);
			});

		setErrors("");
	};
	const signUpWithEmail = (e) => {
		e.preventDefault();
		let credential = firebase.auth.EmailAuthProvider.credential(
			signUpEmail,
			signUpPassword
		);
		firebaseAuth.currentUser
			.linkWithCredential(credential)
			.then((usercred) => {
				const userRef = firestore.collection("users").doc(`${currentUser.uid}`);
				userRef.update({
					firstName: signUpFirstName,
					lastName: signUpLastName,
					email: signUpEmail,
					password: signUpPassword,
					userID: currentUser.uid,
					shipStreetAddress: "",
					shipCity: "",
					shipState: "",
					shipZipcode: "",
					billingStreetAddress: "",
					billingCity: "",
					billingState: "",
					billingZipcode: "",
					cardNumber: "",
					expirationDate: "",
				});
			})
			.catch((error) => {
				console.log("Error upgrading anonymous account", error);
			});
	};

	const signOut = () => {
		firebaseAuth.signOut();
	};

	const authStateObserver = (user) => {
		if (user) {
			setCurrentUser(firebaseAuth.currentUser);
			console.log(`Logged in ${firebaseAuth.currentUser.uid}`);
		} else {
			setCurrentUser("");
			console.log("logged out");
		}
	};

	useEffect(() => {
		setProductList(products);
	}, [products]);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged(authStateObserver);
	});

	useEffect(() => {
		firebaseAuth
			.signInAnonymously()
			.then(() => {
				localStorage.setItem("uid", firebaseAuth.currentUser.uid);
				setCurrentUser(firebaseAuth.currentUser);
			})
			.then(() => {
				addAnonUserToFirestore();
			})
			.catch((error) => console.log(error));
	}, []);

	console.log(firebaseAuth.currentUser);

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar cartItems={cartItems} currentUser={currentUser} />
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/shop">
					<Shop productList={productList} />
				</Route>

				<Route exact path="/cart">
					<Cart cartItems={cartItems} currentUser={currentUser} />
				</Route>

				<Route exact path="/shop/:productName">
					<ItemDetails currentUser={firebaseAuth.currentUser}></ItemDetails>
				</Route>

				<Route
					exact
					path="/Login"
					render={() =>
						currentUser && !currentUser.isAnonymous ? (
							<Redirect to="/Account"></Redirect>
						) : (
							<Login
								handleChange={(e) => handleChange(e)}
								loginWithEmail={(e) => loginWithEmail(e)}
							></Login>
						)
					}
				></Route>
				<Route
					exact
					path="/Account"
					render={() =>
						!currentUser || currentUser.isAnonymous ? (
							<Redirect to="/Login"></Redirect>
						) : (
							<Account currentUser={currentUser} signOut={signOut}></Account>
						)
					}
				></Route>
				<Route
					exact
					path="/CreateAnAccount"
					render={() =>
						currentUser && !currentUser.isAnonymous ? (
							<Redirect to="/Account"></Redirect>
						) : (
							<CreateAccount
								currentUser={currentUser}
								handleChange={(e) => handleChange(e)}
								signUpWithEmail={(e) => signUpWithEmail(e)}
							></CreateAccount>
						)
					}
				></Route>
				<Route
					exact
					path="/LoginOrGuestCheckout"
					render={() =>
						currentUser && !currentUser.isAnonymous ? (
							<Redirect to="/GeneralAccountInfo"></Redirect>
						) : (
							<LoginOrGuestCheckout
								currentUser={currentUser}
							></LoginOrGuestCheckout>
						)
					}
				></Route>
				<Route exact path="/GeneralAccountInfo">
					<GeneralAccountInfo currentUser={currentUser}></GeneralAccountInfo>
				</Route>
				<Route exact path="/ShipOptions">
					<ShipOptions currentUser={currentUser}></ShipOptions>
				</Route>
				<Route exact path="/Payment">
					<Payment currentUser={currentUser}></Payment>
				</Route>
				<Route exact path="/Review">
					<Review currentUser={currentUser}></Review>
				</Route>
				<Route
					exact
					path="/checkout-complete"
					component={CheckoutComplete}
				></Route>
			</Switch>
		</Router>
	);
};

export default App;
