import React, { useState, useEffect } from "react";
//import AddToCartButton from "./AddToCartButton";

const ItemCard = (props) => {
	console.log(props.data.quantity);
	return (
		<div className="itemCard">
			<h3>{props.data.name}</h3>
			<img src={props.data.image}></img>
			<p>{props.data.price}</p>
			<div className="increaseOrDecreaseQtyContainer">
				<button
					className="decreaseQty"
					data-index={props.index}
					onClick={(e) => props.onChangeQty(e)}
				>
					-
				</button>
				<p>{props.data.quantity}</p>
				<button
					className="increaseQty"
					data-index={props.index}
					onClick={(e) => props.onChangeQty(e)}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default ItemCard;
