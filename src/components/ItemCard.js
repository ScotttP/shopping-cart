import React from "react";

const ItemCard = (props) => {
	return (
		<div>
			<h1>{props.data.name}</h1>
			<img src={props.data.image}></img>
			<p>{props.data.price}</p>
			<p>{props.data.quantity}</p>
			<button>Add to Cart</button>
		</div>
	);
};

export default ItemCard;
