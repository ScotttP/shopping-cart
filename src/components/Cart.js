import React from "react";
import { useState } from "react";
import ItemCard from "./ItemCard";
import itemList from "./itemList";

const Cart = (props) => {
	const cartRendering = () => {
		return props.cartItems.map((element, index) => (
			<div
				className="itemCardContainer"
				key={"cartItemCardContainerFor" + element.name}
			>
				<ItemCard
					key={element.name + index + "inCart"}
					index={index}
					data={element}
					onChangeQty={(e) => props.onChangeQty(e)}
				/>
			</div>
		));
	};

	return <div>{cartRendering()}</div>;
};

export default Cart;
