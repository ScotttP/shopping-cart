import React, { useState, useEffect } from "react";
import itemList from "./itemList";

const ItemCard = (props) => {
	//console.log(props.data);
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

			<button>Add to Cart</button>
		</div>
	);
};

export default ItemCard;
