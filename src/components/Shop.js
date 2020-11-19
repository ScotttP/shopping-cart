import React from "react";

import ItemCard from "./ItemCard";

const Shop = (props) => {
	const shopRendering = () => {
		return props.items.map((element, index) => (
			<div
				className="itemCardContainer"
				key={"shopItemCardContainerFor" + element.name}
			>
				<ItemCard
					key={element.name + index + "inShop"}
					index={index}
					data={element}
					onChangeQty={(e) => props.onChangeQty(e)}
				/>
				<button onClick={() => props.addToCart(element)}>Add to Cart</button>
			</div>
		));
	};

	return <div>{shopRendering()}</div>;
};

export default Shop;
