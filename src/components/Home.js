import React from "react";
import { Link } from "react-router-dom";
import facebook from "../Icons/icons8-facebook.svg";
import instagram from "../Icons/icons8-instagram.svg";
import twitter from "../Icons/icons8-twitter-24.png";

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
			<footer id="footer">
				<label>
					<h2>EMAIL SIGNUP</h2>
					<div id="inputAndSendButtonDiv">
						<input
							placeholder="Email Address"
							id="emailSignUpForm"
							type="email"
						></input>
						<button id="sendEmailSignUpButton">Send</button>
					</div>
				</label>
				<div id="followUsDiv">
					<h2>Follow Us</h2>
					<img
						className="socialIcons"
						alt="facebook"
						width="26"
						height="26"
						src={facebook}
					></img>
					<img
						className="socialIcons"
						alt="instagram"
						width="26"
						height="26"
						src={instagram}
					></img>
					<img
						className="socialIcons"
						alt="twitter"
						width="26"
						height="26"
						src={twitter}
					></img>
				</div>
			</footer>
		</div>
	);
};

export default Home;
