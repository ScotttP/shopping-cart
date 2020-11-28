import React from "react";

const ShopItemCard = (props) => {
	return (
		<div className="shopItemCard">
			<h3>{props.data.name}</h3>
			<img
				className="productImagesInShop"
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
				<p className="displayQty">{props.data.quantity}</p>
				<button
					className="increaseQty"
					data-index={props.index}
					data-incart={props.inCart}
					onClick={(e) => props.onChangeQty(e)}
				>
					+
				</button>
			</div>
			<button
				className="addToCartButton"
				onClick={() => props.addToCart(props.data, props.index)}
			>
				+ Add to Cart
			</button>
		</div>
	);
};

export default ShopItemCard;
