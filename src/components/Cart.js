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
					<a id="startShoppingElement">
						<Link to="/shopping-cart/shop">Start Shopping</Link>
					</a>
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
				totalsArray.push(item.quantity * item.price);
			});
			let cost = totalsArray.reduce((acc, curr) => acc + curr);
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(cost);
		}
	};

	return (
		<div id="cartContainer">
			<div id="totalsContainer">
				<h3>Order Summary</h3>
				<p>Order Quantity: {props.sumQty()}</p>
				<p>Order Total: {sumOrder()} </p>
				<button id="checkoutButton">CHECKOUT</button>
			</div>
			{cartRendering()}
		</div>
	);
};

export default Cart;
