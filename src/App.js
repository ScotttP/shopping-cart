import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/shopping-cart" component={Home} />
				<Route exact path="/shopping-cart/shop" component={Shop} />
				<Route exact path="/shopping-cart/cart" component={Cart} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
