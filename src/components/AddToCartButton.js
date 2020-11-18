import React from "react";
import Cart from "./Cart";

const AddToCartButton = (props) => {
	const addToCart = () => {
		console.log("add this to the cart array");
	};
	return <button onClick={addToCart}>Add to Cart</button>;
};

export default AddToCartButton;
