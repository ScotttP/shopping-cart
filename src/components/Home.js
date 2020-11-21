import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div id="home">
			<Link id="startShoppingLink" to="/shopping-cart/shop">
				<button id="startShoppingButton">Start Shopping!</button>
			</Link>
		</div>
	);
};

export default Home;
