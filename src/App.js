import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import itemList from "./components/itemList";

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
		let copyItemListArray = JSON.parse(JSON.stringify(item));
		copyItemListArray[index].quantity = 0;
		setItem(copyItemListArray);
	};

	function sumQty() {
		if (cartItems.length === 0) return 0;
		else {
			let array = cartItems.map((item) => item.quantity);
			return array.reduce((acc, curr) => acc + curr);
		}
	}

	return (
		<BrowserRouter>
			<Navbar cartItems={cartItems} sumQty={sumQty} />
			<Switch>
				<Route exact path="/shopping-cart" component={Home} />

				<Route exact path="/shopping-cart/shop">
					<Shop addToCart={addToCart} onChangeQty={changeQty} items={item} />
				</Route>
				<Route exact path="/shopping-cart/cart">
					<Cart cartItems={cartItems} onChangeQty={changeQty} sumQty={sumQty} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
