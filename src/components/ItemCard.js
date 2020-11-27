import React from "react";

const ItemCard = (props) => {
	const buttonRender = () => {
		if (props.inCart === false) {
			return (
				<button
					className="addToCartButton"
					onClick={() => props.addToCart(props.data, props.index)}
				>
					Add to Cart
				</button>
			);
		} else
			return (
				<button
					className="deleteFromCartButton"
					onClick={() => props.deleteFromCart(props.index)}
				>
					Remove
				</button>
			);
	};

	return (
		<div className="itemCard">
			<h3>{props.data.name}</h3>
			<img
				className="productImages"
				src={props.data.image}
				alt={props.data.name}
			></img>
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
			{buttonRender()}
		</div>
	);
};

export default ItemCard;
