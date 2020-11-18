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
		const index = Number(e.target.getAttribute("index"));
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

	const driverRendering = () => {
		const driverFilter = item.filter((item) => item.category === "Driver");
		return driverFilter.map((element, index) => (
			<ItemCard
				key={element.name + index}
				index={index}
				data={element}
				onChangeQty={changeQty}
			/>
		));
	};

	const ironRendering = () => {
		const driverFilter = item.filter((item) => item.category === "Iron");
		return driverFilter.map((element, index) => (
			<ItemCard
				key={element.name + index}
				index={index}
				data={element}
				onChangeQty={changeQty}
			/>
		));
	};
	const wedgeRendering = () => {
		const driverFilter = item.filter((item) => item.category === "Wedge");
		return driverFilter.map((element, index) => (
			<ItemCard
				key={element.name + index}
				index={index}
				data={element}
				onChangeQty={changeQty}
			/>
		));
	};
	const putterRendering = () => {
		const driverFilter = item.filter((item) => item.category === "Putter");
		return driverFilter.map((element, index) => (
			<ItemCard
				key={element.name + index}
				index={index}
				data={element}
				onChangeQty={changeQty}
			/>
		));
	};

	return (
		<div>
			<div id="drivers">
				<h1>Drivers</h1>
				{driverRendering()}
			</div>
			<div id="irons">
				<h1>Irons</h1>
				{ironRendering()}
			</div>
			<div id="wedges">
				<h1>Wedges</h1>
				{wedgeRendering()}
			</div>
			<div id="putters">
				<h1>Putters</h1>
				{putterRendering()}
			</div>
		</div>
	);
};

export default Shop;
