import "./App.css";
import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import itemList from "./components/itemList";
import CheckoutComplete from "./components/CheckoutComplete";

const App = () => {
	const [cartItems, setCartItems] = useState([]);
	const [item, setItem] = useState(itemList);

	const addToCart = (newItem, index) => {
		if (newItem.quantity === 0) return;
		else {
			setCartItems([...cartItems, newItem]);
			resetQty(index);
		}
	};
	const deleteFromCart = (index) => {
		let copyItemListArray = JSON.parse(JSON.stringify(cartItems));
		copyItemListArray.splice(index, 1);
		setCartItems(copyItemListArray);
	};
	const clearCart = () => {
		const reset = [];
		setCartItems(reset);
	};

	const changeQty = (e) => {
		let isInCart = JSON.parse(e.target.getAttribute("data-incart"));
		let copyItemListArray;
		const index = Number(e.target.getAttribute("data-index"));
		if (
			isInCart === false ||
			JSON.parse(JSON.stringify(cartItems)).length === 0
		) {
			copyItemListArray = JSON.parse(JSON.stringify(item));
		} else copyItemListArray = JSON.parse(JSON.stringify(cartItems));

		if (e.target.className === "decreaseQty") {
			if (copyItemListArray[index].quantity <= 0) return;
			else
				copyItemListArray[index].quantity = --copyItemListArray[index].quantity;
		} else if (e.target.className === "increaseQty") {
			copyItemListArray[index].quantity = ++copyItemListArray[index].quantity;
		}

		if (isInCart === true) {
			setCartItems(copyItemListArray);
		} else setItem(copyItemListArray);
	};

	const resetQty = (index) => {
		//this just resets the quantity of the item that was added to the cart. for instance, when you add something to the cart, and then go to your cart and press back, the quantity will be at zero.
		let copyItemListArray = JSON.parse(JSON.stringify(item));
		copyItemListArray[index].quantity = 0;
		setItem(copyItemListArray);
	};

	function sumQty() {
		//this adds the number of items in the cart to the navbar. as well as adds total quantity in cart component
		if (cartItems.length === 0) return 0;
		else {
			let array = cartItems.map((item) => item.quantity);
			return array.reduce((acc, curr) => acc + curr);
		}
	}

	return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar cartItems={cartItems} sumQty={sumQty} />
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/shop">
					<Shop addToCart={addToCart} onChangeQty={changeQty} items={item} />
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
			</Switch>
		</Router>
	);
};

export default App;
