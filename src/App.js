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

	const addUserToFirestore = async (signedInUser) => {
		//when a user visits this website, they are automatically signed in as anonymous.
		//once they create an account, that anonymous user is then turned into a verified account.
		if (signedInUser.user.isAnonymous) {
			await usersRef.doc(signedInUser.user.uid).set({
				firstName: "",
				lastName: "",
				email: "",

				password: "",
				userID: signedInUser.user.uid,
				cardNumber: "",
				expirationDate: "",
				isAnonymous: true,
			});
			await usersRef.doc(`${signedInUser.user.uid}`).collection("cart").add({
				productName: "",
				price: 0,
				quantity: 0,
				configuration: "",
				shaft: "",
			});
		}
	};

	const updateAnonUserInFirestore = async () => {
		//updates the anonymous user information to the account information
		await usersRef.doc(currentUser.uid).update({
			firstName: signUpFirstName,
			lastName: signUpLastName,
			email: signUpEmail,
			password: "",
			userID: currentUser.uid,
			cardNumber: "",
			expirationDate: "",
			isAnonymous: false,
		});
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
		const credential = firebase.auth.EmailAuthProvider.credential(
			signUpEmail,
			signUpPassword
		);
		firebaseAuth.currentUser
			.linkWithCredential(credential) // this links up the anonymous users information
			.then(() => {
				updateAnonUserInFirestore();
			})
			.catch((error) => {
				setErrors(error);
				console.log(error);
			});

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
		// console.log(currentUser.uid);
	});

	useEffect(() => {
		firebaseAuth
			.signInAnonymously()
			.then((signedInUser) => {
				addUserToFirestore(signedInUser);
			})
			.catch((error) => {
				console.log(error);
				// ...
			});
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
					/>
				</Route>
				<Route
					exact
					path="/checkout-complete"
					component={CheckoutComplete}
				></Route>
				<Route exact path="/shop/:productName">
					<ItemDetails addToCart={addToCart}></ItemDetails>
				</Route>
				<Route
					exact
					path="/Account"
					render={() =>
						!currentUser.isAnonymous ? (
							<Account currentUser={currentUser}></Account>
						) : (
							<Redirect to="/Login"></Redirect>
						)
					}
				></Route>
				<Route exact path="/CreateAnAccount">
					<CreateAccount
						handleChange={(e) => handleChange(e)}
						signUpWithEmail={(e) => signUpWithEmail(e)}
						loginWithGoogle={(e) => loginWithGoogle(e)}
					></CreateAccount>
				</Route>
				<Route
					exact
					path="/Login"
					render={() =>
						currentUser.isAnonymous ? (
							<Login
								currentUser={currentUser}
								handleChange={(e) => handleChange(e)}
								loginWithEmail={(e) => loginWithEmail(e)}
								loginWithGoogle={(e) => loginWithGoogle(e)}
							></Login>
						) : (
							<Redirect to="/Account"></Redirect>
						)
					}
				></Route>
			</Switch>
		</Router>
	);
};

export default App;
