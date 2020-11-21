import React from "react";
import uniqid from "uniqid";
import ItemCard from "./ItemCard";

const Cart = (props) => {
	const cartRendering = () => {
		return props.cartItems.map((element, index) => (
			<div className="itemCardContainer" key={uniqid()}>
				<ItemCard
					key={uniqid()}
					index={index}
					data={element}
					onChangeQty={(e) => props.onChangeQty(e)}
					inCart={true}
				/>
			</div>
		));
	};

	const sumOrder = () => {
		let totalsArray = [];
		if (props.cartItems.length === 0) return 0;
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
			{cartRendering()}
			<div id="totalsContainer">
				<h3>Order Summary</h3>
				<p>Order Quantity: {props.sumQty()}</p>
				<p>Order Total: {sumOrder()} </p>
			</div>
			<button>Checkout</button>
		</div>
	);
};

export default Cart;
