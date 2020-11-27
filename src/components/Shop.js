import React, { useEffect } from "react";
import uniqid from "uniqid";
import ItemCard from "./ItemCard";

const Shop = (props) => {
	const shopRendering = () => {
		return props.items.map((element, index) => (
			<div key={uniqid()} className="itemCardContainer">
				<ItemCard
					key={uniqid()}
					index={index}
					data={element}
					onChangeQty={(e) => props.onChangeQty(e)}
					inCart={false}
				/>
				<button
					className="addToCartButton"
					onClick={() => props.addToCart(element, index)}
				>
					Add to Cart
				</button>
			</div>
		));
	};

	return <div id="itemCardGridContainer">{shopRendering()}</div>;
};

export default Shop;
