import React from "react";
import { Link } from "react-router-dom";

const Review = (props) => {
	return (
		<div>
			List of items in the cart
			<Link to="/checkout-complete">
				<button>Submit Order</button>
			</Link>
		</div>
	);
};

export default Review;
