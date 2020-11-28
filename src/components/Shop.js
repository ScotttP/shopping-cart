import React from "react";
import uniqid from "uniqid";
import ShopItemCard from "./ShopItemCard";

const Shop = (props) => {
	const shopRendering = () => {
		return props.items.map((element, index) => (
			<div key={uniqid()} className="itemCardContainer">
				<ShopItemCard
					key={uniqid()}
					index={index}
					data={element}
					onChangeQty={(e) => props.onChangeQty(e)}
					inCart={false}
					addToCart={() => props.addToCart(element, index)}
				/>
			</div>
		));
	};

	return <div id="itemCardGridContainer">{shopRendering()}</div>;
};

export default Shop;
