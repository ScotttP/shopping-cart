import React, { useState } from "react";
import uniqid from "uniqid";
import CartItemCard from "./CartItemCard";
import CheckoutReviewItemCard from "./CheckoutReviewItemCard";
import { Link } from "react-router-dom";

import firebase from "../components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const Cart = (props) => {
	const [uid, setUid] = useState(() => {
		if (firebaseAuth.currentUser === null) {
			return localStorage.getItem("uid");
		} else {
			return firebaseAuth.currentUser.uid;
		}
	});

	const userCartRef = firestore
		.collection("users")
		.doc(`${uid}`)
		.collection("cart");
	const userCartQuery = userCartRef.orderBy("productName", "asc");

	const [cartList] = useCollectionData(userCartQuery, { idField: "id" });

	const cartRendering = () => {
		if (cartList === undefined) {
			return <div>LOADING</div>;
		} else if (cartList.length === 0) {
			return (
				<div id="emptyCartContainer">
					<h1 id="yourCartIsEmpty">Your Cart Is Empty</h1>
					<div id="goToShopElement">
						<Link to="/shop">Start Shopping</Link>
					</div>
				</div>
			);
		}
		if (props.isInReview) {
			return cartList.map((element, index) => (
				<div className="cartItemCardContainer" key={uniqid()}>
					<CheckoutReviewItemCard
						key={uniqid()}
						id={element.id}
						index={index}
						uid={uid}
						data={element}
						onChangeQty={(e) => props.onChangeQty(e)}
						inCart={true}
						deleteFromCart={() => props.deleteFromCart(element, index)}
					/>
				</div>
			));
		} else {
			return cartList.map((element, index) => (
				<div className="cartItemCardContainer" key={uniqid()}>
					<CartItemCard
						key={uniqid()}
						id={element.id}
						index={index}
						uid={uid}
						data={element}
						onChangeQty={(e) => props.onChangeQty(e)}
						inCart={true}
						deleteFromCart={() => props.deleteFromCart(element, index)}
					/>
				</div>
			));
		}
	};

	const clearCart = async () => {
		await userCartRef.onSnapshot((snapshot) => {
			snapshot.docs.forEach((doc) => {
				userCartRef.doc(doc.id).delete();
			});
		});
		await addANewCart();
	};

	const submitOrderWrapper = () => {
		props.setAsInReview();
		clearCart();
	};

	const addANewCart = () => {
		firestore
			.collection("users")
			.doc(`${firebaseAuth.currentUser.uid}`)
			.collection("cart")
			.add({});
	};

	const sumOrder = () => {
		let totalsArray = [];

		if (cartList === undefined || cartList.length <= 0) return `$0.00`;
		else {
			cartList.map((item) => {
				return totalsArray.push(item.quantity * item.price);
			});
			let cost = totalsArray.reduce((acc, curr) => acc + curr);
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(cost);
		}
	};

	function sumQty() {
		//this adds the number of items in the cart to the navbar. as well as adds total quantity in cart component
		if (cartList === undefined || cartList.length <= 0) return 0;
		else {
			let array = cartList.map((item) => item.quantity);
			return array.reduce((acc, curr) => acc + curr);
		}
	}
	const buttonRender = () => {
		if (cartList === undefined || cartList.length <= 0) return;
		else if (props.isInReview)
			return (
				<Link to="/checkout-complete">
					<button id="checkoutButton" onClick={() => submitOrderWrapper()}>
						SUBMIT ORDER
					</button>
				</Link>
			);
		else
			return (
				<Link to="/LoginOrGuestCheckout">
					<button id="checkoutButton" onClick={props.setAsInReview}>
						CHECKOUT
					</button>
				</Link>
			);
	};

	return (
		<div id="cartContainer">
			<div id="totalsContainer">
				<h3>Order Summary</h3>
				<p>Order Quantity: {sumQty()}</p>
				<p>Order Total: {sumOrder()} </p>
				{buttonRender()}
			</div>
			{cartRendering()}
		</div>
	);
};

export default Cart;
