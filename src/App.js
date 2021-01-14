import "./App.css";
import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import itemList from "./components/itemList";
import CheckoutComplete from "./components/CheckoutComplete";
import ItemDetails from "./components/ItemDetails";

const App = () => {
	const [cartItems, setCartItems] = useState([]);
	const [item, setItem] = useState(itemList);

	const addToCart = (product) => {
		const copyOfCartItemsArray = JSON.parse(JSON.stringify(cartItems));
		if (copyOfCartItemsArray.includes(product)) {
			product.quantity = ++product.quantity;
		} else setCartItems([...cartItems, product]);
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
	console.log(cartItems);
	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar cartItems={cartItems} sumQty={sumQty} />
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/shop">
					<Shop items={item} />
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
			</Switch>
		</Router>
	);
};

export default App;
