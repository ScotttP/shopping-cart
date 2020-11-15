import React from "react";
import { useEffect } from "react";
import ItemCard from "./ItemCard";
import itemList from "./itemList";

const Shop = () => {
	function driverRendering() {
		const driverFilter = itemList.filter((item) => item.category === "Driver");
		return driverFilter.map((element) => <ItemCard data={element} />);
	}

	function ironRendering() {
		const driverFilter = itemList.filter((item) => item.category === "Iron");
		return driverFilter.map((element) => <ItemCard data={element} />);
	}
	function wedgeRendering() {
		const driverFilter = itemList.filter((item) => item.category === "Wedge");
		return driverFilter.map((element) => <ItemCard data={element} />);
	}
	function putterRendering() {
		const driverFilter = itemList.filter((item) => item.category === "putter");
		return driverFilter.map((element) => <ItemCard data={element} />);
	}
	useEffect(() => {}, []);

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
