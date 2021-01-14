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

const App = () => {
	const [cartItems, setCartItems] = useState([]);

	const productsRef = firestore.collection("products");
	const productsQuery = productsRef.orderBy("category", "asc");

	const [products] = useCollectionData(productsQuery, { idField: "id" });
	const [productList, setProductList] = useState([{}]);

	const [currentUser, setCurrentUser] = useState("");

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

	useEffect(() => {
		setProductList(products);
	}, [products]);

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar cartItems={cartItems} sumQty={sumQty} />
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
						currentUser ? (
							<Account></Account>
						) : (
							<Redirect to="/Account"></Redirect>
						)
					}
				></Route>
				<Route exact path="/CreateAnAccount">
					<CreateAccount></CreateAccount>
				</Route>
				<Route
					exact
					path="/Login"
					render={() =>
						!currentUser ? <Login></Login> : <Redirect to="/Account"></Redirect>
					}
				></Route>
			</Switch>
		</Router>
	);
};

export default App;
