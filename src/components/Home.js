import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
	return (
		<div>
			<div id="home">
				<div id="homepageText">
					<h1 id="sloganHeader">Better Everything.</h1>
					<button id="startShoppingButton">
						<Link to="/shop">Start Shopping</Link>
					</button>
				</div>
			</div>
			<div id="buttonContainer">
				<Link
					to="/shop"
					id="linkToDrivers"
					className="viewDriversButton"
					onClick={(e) => props.handleFilter(e)}
				>
					<span>Drivers</span>
				</Link>
				<Link
					to="/shop"
					id="linkToIrons"
					className="viewIronsButton"
					onClick={(e) => props.handleFilter(e)}
				>
					<span>Irons</span>
				</Link>

				<Link
					to="/shop"
					id="linkToPutters"
					className="viewPuttersButton"
					onClick={(e) => props.handleFilter(e)}
				>
					<span>Putters</span>
				</Link>
			</div>
			<div id="informationContainer">
				<div id="textInnerDiv">
					<h1>Better Everything Is What We Do.</h1>
					<p>
						Turn your passion for the game into rewards. Join now to earn points
						on every dollar you spend, get free shipping on all orders and be
						the first to know about special offers and exclusive opportunities.
						Points can be redeemed for dollars off future purchases.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
