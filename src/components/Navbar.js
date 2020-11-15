import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div id="navBarContainer">
			<ul id="navBarList">
				<li>
					<Link to="/shopping-cart">Home</Link>
				</li>
				<div id="navBarRight">
					<li>
						<Link to="/shopping-cart/shop">Shop</Link>
					</li>
					<li>
						<Link to="/shopping-cart/cart">Cart</Link>
						<span id="inShoppingCart"> 0</span>
					</li>
				</div>
			</ul>
		</div>
	);
};

export default Navbar;
