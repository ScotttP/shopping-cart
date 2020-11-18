import React from "react";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import itemList from "./itemList";

const Shop = () => {
	const [item, setItem] = useState(itemList);

	useEffect(() => {
		// setItem(item);
	}, [item]);

	const changeQty = (e) => {
		const index = Number(e.target.getAttribute("data-index"));
		const copyItemListArray = JSON.parse(JSON.stringify(item));
		if (e.target.className === "decreaseQty") {
			if (copyItemListArray[index].quantity <= 0) return;
			else
				copyItemListArray[index].quantity = --copyItemListArray[index].quantity;
		} else if (e.target.className === "increaseQty") {
			copyItemListArray[index].quantity = ++copyItemListArray[index].quantity;
		}
		setItem(copyItemListArray);
	};

	const itemRendering = () => {
		return item.map((element, index) => (
			<ItemCard
				key={element.name + index}
				index={index}
				data={element}
				onChangeQty={changeQty}
			/>
		));
	};

	return <div>{itemRendering()}</div>;
};

export default Shop;
