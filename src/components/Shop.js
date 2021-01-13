import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import ShopItemCard from "./ShopItemCard";
import facebook from "../Icons/icons8-facebook.svg";
import instagram from "../Icons/icons8-instagram.svg";
import twitter from "../Icons/icons8-twitter-24.png";
import { render } from "@testing-library/react";
import ItemDetails from "./ItemDetails";

const Shop = (props) => {
	const [filteredArray, setFilteredArray] = useState([]);
	const shopRendering = () => {
		return filteredArray.map((element, index) => (
			<Link to={`/shop/${element.name}`}>
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
			</Link>
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

			<footer id="footer">
				<label>
					<h2>EMAIL SIGNUP</h2>
					<input
						placeholder="Email Address"
						id="emailSignUpForm"
						type="email"
					></input>
					<button id="sendEmailSignUpButton">Send</button>
				</label>
				<div id="followUsDiv">
					<h2>Follow Us</h2>
					<img src={facebook}></img>
					<img src={instagram}></img>
					<img src={twitter}></img>
				</div>
			</footer>
		</div>
	);
};

export default Shop;
