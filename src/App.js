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

import CheckoutComplete from "./components/CheckOut/CheckoutComplete";

import firebase from "./components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GeneralAccountInfo from "./components/CheckOut/GeneralAccountInfo";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const App = () => {
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
	const [isInReview, setIsInReview] = useState(false);

	const [errors, setErrors] = useState("");

	const [filteredArray, setFilteredArray] = useState(products);

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

	const handleFilter = (e) => {
		if (e.target.className === "viewAllClubsButton") {
			setFilteredArray(productList);
		} else if (e.target.className === "viewDriversButton") {
			return setFilteredArray(
				productList.filter((todo) => {
					return todo.category === "Driver";
				})
			);
		} else if (e.target.className === "viewIronsButton") {
			return setFilteredArray(
				productList.filter((todo) => {
					return todo.category === "Iron";
				})
			);
		} else {
			return setFilteredArray(
				productList.filter((todo) => {
					return todo.category === "Putter";
				})
			);
		}
	};

	const signInAnonymously = () => {
		firebaseAuth
			.signInAnonymously()
			.then(() => {
				addAnonUserToFirestore();
			})
			.then(() => {
				localStorage.setItem("uid", firebaseAuth.currentUser.uid);
			})
			.catch((error) => console.log(error));
	};

	const addAnonUserToFirestore = async () => {
		if (
			firebaseAuth.currentUser.uid !== null ||
			firebaseAuth.currentUser.uid !== undefined
		) {
			try {
				usersRef.doc(`${firebaseAuth.currentUser.uid}`).set({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					userID: firebaseAuth.currentUser.uid,
					cardNumber: "",
					expirationDate: "",
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const loginWithEmail = (e) => {
		// e.preventDefault();
		// firebaseAuth
		// 	.signInWithEmailAndPassword(loginEmail, loginPassword)
		// 	.catch((error) => {
		// 		setErrors(error);
		// 		console.log(error);
		// 	});

		// setErrors("");
		console.log("need to re work this when guest checkout is implemented");
	};
	const signUpWithEmail = (e) => {
		// let credential = firebase.auth.EmailAuthProvider.credential(
		// 	signUpEmail,
		// 	signUpPassword
		// );

		// if (firebaseAuth.currentUser !== null) {
		// 	firebaseAuth.currentUser
		// 		.linkWithCredential(credential)
		// 		.then(() => {
		// 			const userRef = firestore
		// 				.collection("users")
		// 				.doc(`${currentUser.uid}`);

		// 			userRef
		// 				.update({
		// 					firstName: signUpFirstName,
		// 					lastName: signUpLastName,
		// 					email: signUpEmail,

		// 					userID: currentUser.uid,
		// 					shipStreetAddress: "",
		// 					shipCity: "",
		// 					shipState: "",
		// 					shipZipcode: "",
		// 					billingStreetAddress: "",
		// 					billingCity: "",
		// 					billingState: "",
		// 					billingZipcode: "",
		// 					cardNumber: "",
		// 					expirationDate: "",
		// 				})
		// 				.catch((error) => console.log(error));
		// 		})
		// 		.then(() => {
		// 			firebaseAuth
		// 				.signInWithEmailAndPassword(signUpEmail, signUpPassword)
		// 				.catch((error) => {
		// 					setErrors(error);
		// 					console.log(error);
		// 				});
		// 			setCurrentUser(firebaseAuth.currentUser);
		// 			setErrors("");
		// 		})
		// 		.catch((error) => {
		// 			console.log("Error upgrading anonymous account", error);
		// 		});
		// } else {
		// 	console.log("no anon account to link to");
		// }
		console.log("need to re work this sign in process");
	};

	const signOut = () => {
		firebaseAuth.signOut();
		// signInAnonymously();
	};

	const authStateObserver = (user) => {
		if (user) {
			setCurrentUser(firebaseAuth.currentUser);
		}
	};

	const setAsInReview = () => {
		setIsInReview((prevState) => {
			console.log(prevState);
			if (prevState === false) return true;
			else return false;
		});
	};

	useEffect(() => {
		setProductList(products);
	}, [products]);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged(authStateObserver);
	}, [currentUser]);

	useEffect(() => {
		if (!localStorage.getItem("uid")) {
			signInAnonymously();
		}
	}, [currentUser]);

	useEffect(() => {
		setFilteredArray(productList);
	}, [productList]);

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar currentUser={currentUser} />
			<Switch>
				<Route exact path="/">
					<Home handleFilter={(e) => handleFilter(e)}></Home>
				</Route>

				<Route exact path="/shop">
					<Shop
						productList={productList}
						filteredArray={filteredArray}
						handleFilter={(e) => handleFilter(e)}
					/>
				</Route>

				<Route exact path="/cart">
					<Cart
						currentUser={currentUser}
						isInReview={isInReview}
						setAsInReview={() => setAsInReview()}
					/>
				</Route>

				<Route exact path="/shop/:productName">
					<ItemDetails
						currentUser={firebaseAuth.currentUser}
						signInAnonymously={() => signInAnonymously()}
					></ItemDetails>
				</Route>

				<Route
					exact
					path="/Login"
					render={() =>
						currentUser.isAnonymous === false &&
						currentUser.isAnonymous !== undefined ? (
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
						currentUser === "" || currentUser.isAnonymous === true ? (
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
						currentUser.isAnonymous === false ? (
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
						currentUser.isAnonymous === false ? (
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
					<Cart
						currentUser={currentUser}
						isInReview={isInReview}
						setAsInReview={() => setAsInReview()}
					/>
				</Route>
				<Route
					exact
					path="/checkout-complete"
					component={CheckoutComplete}
				></Route>
				<Route exact path="/AccountTest">
					<div>HI</div>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
