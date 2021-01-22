import React from "react";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import ShopItemCard from "./ShopItemCard";
import facebook from "../Icons/icons8-facebook.svg";
import instagram from "../Icons/icons8-instagram.svg";
import twitter from "../Icons/icons8-twitter-24.png";

const Shop = (props) => {
	const shopRendering = () => {
		if (props.filteredArray === undefined) return <div>LOADING</div>;
		else
			return props.filteredArray.map((element, index) => (
				<Link key={uniqid()} to={`/shop/${element.name}`}>
					<div key={uniqid()} className="itemCardContainer">
						<ShopItemCard
							key={uniqid()}
							index={index}
							data={element}
							addToCart={() => props.addToCart(element, index)}
						/>
					</div>
				</Link>
			));
	};

	return (
		<div id="shopContainer">
			<div id="filterContainer">
				<button
					onClick={(e) => props.handleFilter(e)}
					className="viewAllClubsButton"
				>
					All
				</button>
				<button
					onClick={(e) => props.handleFilter(e)}
					className="viewDriversButton"
				>
					Drivers
				</button>
				<button
					onClick={(e) => props.handleFilter(e)}
					className="viewIronsButton"
				>
					Irons
				</button>

				<button
					onClick={(e) => props.handleFilter(e)}
					className="viewPuttersButton"
				>
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
					<img alt="facebook" src={facebook}></img>
					<img alt="instagram" src={instagram}></img>
					<img alt="twitter" src={twitter}></img>
				</div>
			</footer>
		</div>
	);
};

export default Shop;
