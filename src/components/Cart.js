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

	return <div>{cartRendering()}</div>;
};

export default Cart;
