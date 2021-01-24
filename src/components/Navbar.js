import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/taylorMadeLogo.png";
import golfBag from "../components/golf-bag.svg";

import firebase from "../components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

const Navbar = (props) => {
	const userCartRef = firestore
		.collection("users")
		.doc(`${props.currentUser.uid}`)
		.collection("cart");
	const userCartQuery = userCartRef.orderBy("productName", "asc");

	const [cartList] = useCollectionData(userCartQuery, { idField: "id" });

	const sumQty = () => {
		//this adds the number of items in the cart to the navbar. as well as adds total quantity in cart component
		if (cartList === undefined || cartList.length <= 0) return 0;
		else {
			let array = cartList.map((item) => item.quantity);
			return array.reduce((acc, curr) => acc + curr);
		}
	};

	const LoginAndAccountRender = () => {
		// if (
		// 	props.currentUser.isAnonymous === false &&
		// 	props.currentUser !== null &&
		// 	props.currentUser !== ""
		// )
		// 	return <Link to="/Account">Account</Link>;
		// else return <Link to="/Login">Login</Link>;
		return null;
	};

	return (
		<header id="navBarContainer">
			<div id="navBarList">
				<p id="homepage">
					<Link to="/">
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
					{/* <p id="accountElement">{LoginAndAccountRender()}</p> */}
					<p id="shopElement">
						<Link to="/shop">Shop</Link>
					</p>

					<p id="shoppingCartElement">
						<Link to="/cart">
							<span id="inShoppingCartCount">{sumQty()}</span>
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
