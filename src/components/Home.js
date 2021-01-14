import React from "react";
import { Link } from "react-router-dom";
import facebook from "../Icons/icons8-facebook.svg";
import instagram from "../Icons/icons8-instagram.svg";
import twitter from "../Icons/icons8-twitter-24.png";

const Home = () => {
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
				<Link to="/shop" id="linkToDrivers">
					<span>Drivers</span>
				</Link>
				<Link to="/shop" id="linkToIrons">
					<span>Irons</span>
				</Link>

				{/* ****** NEED TO ADD WEDGE BUTTON ******** */}
				<Link to="/shop" id="linkToPutters">
					<span>Putters</span>
				</Link>
			</div>
			<div id="informationContainer">
				<div id="textInnerDiv">
					<h1>Better Everything Is What We Do.</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
						a lectus tortor. Aliquam congue magna et leo convallis molestie.
						Suspendisse sed erat id lectus blandit faucibus. Suspendisse
						ultrices fermentum diam et tristique. Cras fringilla ornare mattis.
						Vestibulum quis tellus et orci bibendum commodo. Suspendisse ac odio
						maximus nisl efficitur finibus eget et lorem. Etiam volutpat tortor
						ut laoreet tincidunt. Ut dignissim justo eu efficitur pellentesque.
						Donec aliquet faucibus eros vitae sagittis. Integer fermentum orci
						in faucibus imperdiet.
					</p>
				</div>
				<img
					id="clubsImage"
					src="https://www.taylormadegolf.com/on/demandware.static/-/Sites-TMaG-Library/en_US/v1610442348251/TaylorMade/homepage_test/images/custom-desktop.jpg"
				></img>
			</div>
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

export default Home;
