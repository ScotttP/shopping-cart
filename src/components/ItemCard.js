import React, { useEffect } from "react";

const ItemCard = (props) => {
	useEffect(() => {
		console.log("useEffect");
	}, [props.data.quantity]);
	return (
		<div className="itemCard">
			<h3>{props.data.name}</h3>
			<img src={props.data.image} alt={props.data.name}></img>
			<p>
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(props.data.price)}
			</p>
			<div className="increaseOrDecreaseQtyContainer">
				<button
					className="decreaseQty"
					data-index={props.index}
					data-incart={props.inCart}
					onClick={(e) => props.onChangeQty(e)}
				>
					-
				</button>
				<p>{props.data.quantity}</p>
				<button
					className="increaseQty"
					data-index={props.index}
					data-incart={props.inCart}
					onClick={(e) => props.onChangeQty(e)}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default ItemCard;
