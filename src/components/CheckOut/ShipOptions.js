import React from "react";
import { Link } from "react-router-dom";

const ShipOptions = (props) => {
	return (
		<div>
			<label>
				Free - $0.00
				<input name="shippingOption" type="radio"></input>
			</label>
			<br></br>
			<label>
				Standard - $4.99
				<input name="shippingOption" type="radio"></input>
			</label>
			<br></br>
			<label>
				Express - $9.99
				<input name="shippingOption" type="radio"></input>
			</label>
			<br></br>
			<Link to="/Payment">
				<button>Payment Options</button>
			</Link>
		</div>
	);
};

export default ShipOptions;
