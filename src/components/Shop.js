import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import ShopItemCard from "./ShopItemCard";

const Shop = (props) => {
	const [filteredArray, setFilteredArray] = useState([]);
	const shopRendering = () => {
		return filteredArray.map((element, index) => (
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
	const handleFilter = (e) => {
		if (e.target.id === "viewAllClubsButton") {
			setFilteredArray(props.items);
		} else if (e.target.id === "viewDriversButton") {
			return setFilteredArray(
				props.items.filter((todo) => {
					return todo.category === "Driver";
				})
			);
		} else if (e.target.id === "viewIronsButton") {
			return setFilteredArray(
				props.items.filter((todo) => {
					return todo.category === "Iron";
				})
			);
		} else if (e.target.id === "viewWedgesButton") {
			return setFilteredArray(
				props.items.filter((todo) => {
					return todo.category === "Wedge";
				})
			);
		} else {
			return setFilteredArray(
				props.items.filter((todo) => {
					return todo.category === "Putter";
				})
			);
		}
	};

	useEffect(() => {
		setFilteredArray(props.items);
	}, [props.items]);

	return (
		<div id="shopContainer">
			<div id="filterContainer">
				<button onClick={(e) => handleFilter(e)} id="viewAllClubsButton">
					All
				</button>
				<button onClick={(e) => handleFilter(e)} id="viewDriversButton">
					Drivers
				</button>
				<button onClick={(e) => handleFilter(e)} id="viewIronsButton">
					Irons
				</button>
				<button onClick={(e) => handleFilter(e)} id="viewWedgesButton">
					Wedges
				</button>
				<button onClick={(e) => handleFilter(e)} id="viewPuttersButton">
					Putters
				</button>
			</div>
			<div id="itemCardGridContainer">{shopRendering()}</div>
		</div>
	);
};

export default Shop;
