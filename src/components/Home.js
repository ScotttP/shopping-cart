import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div id="home">
			<Link id="startShoppingLink" to="/shopping-cart/shop">
				<button id="startShoppingButton">
					<span>Start Shopping </span>
				</button>
			</Link>
		</div>
	);
};

export default Home;
