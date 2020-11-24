import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	return (
		<div id="navBarContainer">
			<ul id="navBarList">
				<li>
					<Link to="/shopping-cart">
						<img
							id="taylorMadeLogo"
							src="https://o.remove.bg/downloads/2218af9b-ee28-42da-8903-766742f1125e/490-4901795_salisbury-new-taylormade-m1-demo-tailor-made-logo-removebg-preview.png"
							alt="logo"
						></img>
					</Link>
				</li>
				<div id="navBarRight">
					<li>
						<Link to="/shopping-cart/shop">Shop</Link>
					</li>
					<li>
						<Link to="/shopping-cart/cart">Cart</Link>
						<span id="inShoppingCart">{props.sumQty()} </span>
					</li>
				</div>
			</ul>
		</div>
	);
};

export default Navbar;
