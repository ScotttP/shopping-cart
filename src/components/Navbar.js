import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/taylorMadeLogo.png";
import golfBag from "../components/golf-bag.svg";

const Navbar = (props) => {
	return (
		<div id="navBarContainer">
			<ul id="navBarList">
				<li id="homepage">
					<Link to="/shopping-cart">
						<img id="taylorMadeLogo" src={Logo} alt="logo"></img>
					</Link>
				</li>
				<div id="navBarRight">
					<li id="shopElement">
						<Link to="/shopping-cart/shop">Shop</Link>
					</li>
					<li id="shoppingCartElement">
						<Link to="/shopping-cart/cart">
							<span id="inShoppingCartCount">{props.sumQty()} </span>
							<span id="golfBagLink">
								<img id="golfBagLogo" src={golfBag} alt="Shopping Cart"></img>
							</span>
						</Link>
					</li>
				</div>
			</ul>
		</div>
	);
};

export default Navbar;
