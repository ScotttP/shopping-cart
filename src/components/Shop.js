import React from "react";
import uniqid from "uniqid";
import ItemCard from "./ItemCard";

const Shop = (props) => {
	const shopRendering = () => {
		return props.items.map((element, index) => (
			<div
				className="itemCardContainer"
				key={"shopItemCardContainerFor" + element.name}
			>
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
