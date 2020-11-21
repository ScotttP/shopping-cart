import React, { useEffect } from "react";
import uniqid from "uniqid";
import ItemCard from "./ItemCard";

const Shop = (props) => {
	console.log("shopRendering");
	const shopRendering = () => {
		return props.items.map((element, index) => (
			<div className="itemCardContainer">
				<ItemCard
					key={uniqid()}
					index={index}
					data={element}
					onChangeQty={(e) => props.onChangeQty(e)}
					inCart={false}
				/>
				<button onClick={() => props.addToCart(element, index)}>
					Add to Cart
				</button>
			</div>
		));
	};

	return <div>{shopRendering()}</div>;
};

export default Shop;
