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
import itemList from "./components/itemList";
import CheckoutComplete from "./components/CheckoutComplete";
import ItemDetails from "./components/ItemDetails";
import Account from "./components/UserAuth/Account";
import Login from "./components/UserAuth/Login";
import CreateAccount from "./components/UserAuth/CreateAccount";

import firebase from "./components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

	const addToCart = (product) => {
		const copyOfCartItemsArray = JSON.parse(JSON.stringify(cartItems));
		if (copyOfCartItemsArray.includes(product)) {
			product.quantity = ++product.quantity;
		} else setCartItems([...cartItems, product]);

		console.log("add to cart");
	};

	const deleteFromCart = () => {
		console.log("delete from cart");
	};

	const changeQty = () => {
		console.log("change qty");
	};

	const sumQty = () => {
		return 0;
	};

	const clearCart = () => {
		setCartItems([]);
	};

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

	const addUserToFirestore = async () => {
		await usersRef.doc(`${currentUser.uid}`).set({
			firstName: signUpFirstName,
			lastName: signUpLastName,
			email: signUpEmail,
			password: signUpPassword,
			userID: currentUser.uid,
			cardNumber: "",
			expirationDate: "",
		});
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
		firebaseAuth
			.createUserWithEmailAndPassword(signUpEmail, signUpPassword)
			.then(() => {
				addUserToFirestore();
			})
			.catch((error) => console.log(error));
		setErrors("");
	};

	const signOut = () => {
		firebaseAuth.signOut();
	};

	const authStateObserver = (user) => {
		if (user) {
			setCurrentUser(firebaseAuth.currentUser);
		} else {
			setCurrentUser("");
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

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar cartItems={cartItems} sumQty={sumQty} currentUser={currentUser} />
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/shop">
					<Shop productList={productList} />
				</Route>

				<Route exact path="/cart">
					<Cart
						deleteFromCart={deleteFromCart}
						cartItems={cartItems}
						onChangeQty={changeQty}
						sumQty={sumQty}
						clearCart={() => clearCart}
						currentUser={currentUser}
					/>
				</Route>

				<Route
					exact
					path="/checkout-complete"
					component={CheckoutComplete}
				></Route>

				<Route exact path="/shop/:productName">
					<ItemDetails
						currentUser={firebaseAuth.currentUser}
						addToCart={addToCart}
					></ItemDetails>
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
								handleChange={(e) => handleChange(e)}
								signUpWithEmail={(e) => signUpWithEmail(e)}
							></CreateAccount>
						)
					}
				></Route>
			</Switch>
		</Router>
	);
};

export default App;
