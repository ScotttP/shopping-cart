import React from "react";
import { Link } from "react-router-dom";
import ItemDetails from "./ItemDetails";

const ShopItemCard = (props) => {
	return (
		<div className="shopItemCard">
			<img
				className="productImagesInShop"
				src={props.data.image}
				alt={props.data.name}
			></img>
			<h2>{props.data.name}</h2>
			<p>
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(props.data.price)}
			</p>
			{/* <Link
				to={`/shop/${props.data.name}`}
				render={() => {
					<ItemDetails data={props.data.name}></ItemDetails>;
				}}
			>
				Click ME
			</Link> */}
			{/* <div className="increaseOrDecreaseQtyContainer">
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
			</button> */}
		</div>
	);
};

export default ShopItemCard;
