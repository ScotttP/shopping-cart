import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/taylorMadeLogo.png";
import golfBag from "../components/golf-bag.svg";

const Navbar = (props) => {
	return (
		<header id="navBarContainer">
			<div id="navBarList">
				<p id="homepage">
					<Link to="">
						<img
							id="taylorMadeLogo"
							src={Logo}
							alt="logo"
							width="150"
							height="41.5"
						></img>
					</Link>
				</p>
				<div id="navBarRight">
					<p id="shopElement">
						<Link to="/shop">Shop</Link>
					</p>
					<p id="shoppingCartElement">
						<Link to="/cart">
							<span id="inShoppingCartCount">{props.sumQty()} </span>
							<span id="golfBagLink">
								<img
									id="golfBagLogo"
									src={golfBag}
									alt="Shopping Cart"
									width="35"
									height="35"
								></img>
							</span>
						</Link>
					</p>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
