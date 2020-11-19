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

	const addToCart = (newItem) => {
		console.log(newItem.name);
		setCartItems([...cartItems, newItem]);
	};

	const changeQty = (e) => {
		const index = Number(e.target.getAttribute("data-index"));
		const copyItemListArray = JSON.parse(JSON.stringify(item));
		if (e.target.className === "decreaseQty") {
			if (copyItemListArray[index].quantity <= 0) return;
			else
				copyItemListArray[index].quantity = --copyItemListArray[index].quantity;
		} else if (e.target.className === "increaseQty") {
			copyItemListArray[index].quantity = ++copyItemListArray[index].quantity;
		}
		setItem(copyItemListArray);
		console.log(copyItemListArray[index].quantity);
	};
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/shopping-cart" component={Home} />
				<Route exact path="/shopping-cart/shop">
					<Shop addToCart={addToCart} onChangeQty={changeQty} items={item} />
				</Route>
				<Route exact path="/shopping-cart/cart">
					<Cart cartItems={cartItems} onChangeQty={changeQty} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
