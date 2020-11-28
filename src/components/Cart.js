import React from "react";
import uniqid from "uniqid";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";

const Cart = (props) => {
	const cartRendering = () => {
		if (props.cartItems.length === 0) {
			return (
				<div id="emptyCartContainer">
					<h1 id="yourCartIsEmpty">Your Cart Is Empty</h1>
					<div id="goToShopElement">
						<Link to="/shopping-cart/shop">Start Shopping</Link>
					</div>
				</div>
			);
		} else
			return props.cartItems.map((element, index) => (
				<div className="cartItemCardContainer" key={uniqid()}>
					<CartItemCard
						key={uniqid()}
						index={index}
						data={element}
						onChangeQty={(e) => props.onChangeQty(e)}
						inCart={true}
						deleteFromCart={() => props.deleteFromCart(element, index)}
					/>
				</div>
			));
	};

	const sumOrder = () => {
		let totalsArray = [];
		if (props.cartItems.length === 0) return `$0.00`;
		else {
			props.cartItems.map((item) => {
				return totalsArray.push(item.quantity * item.price);
			});
			let cost = totalsArray.reduce((acc, curr) => acc + curr);
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(cost);
		}
	};
	const buttonRender = () => {
		console.log("buttonRender");
		if (props.cartItems.length <= 0) return;
		else
			return (
				<Link to="/shopping-cart/checkout-complete">
					<button onClick={props.clearCart()} id="checkoutButton">
						CHECKOUT
					</button>
				</Link>
			);
	};

	return (
		<div id="cartContainer">
			<div id="totalsContainer">
				<h3>Order Summary</h3>
				<p>Order Quantity: {props.sumQty()}</p>
				<p>Order Total: {sumOrder()} </p>
				{buttonRender()}
			</div>
			{cartRendering()}
		</div>
	);
};

export default Cart;
