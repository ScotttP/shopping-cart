import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/shopping-cart">Home</Link>
					</li>
					<li>
						<Link to="/shopping-cart/shop">Shop</Link>
					</li>
					<li>
						<Link to="/shopping-cart/cart">Cart</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
