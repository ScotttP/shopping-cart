import React from "react";
import { Link } from "react-router-dom";

const GeneralAccountInfo = (props) => {
	return (
		<div id="navBarContainer">
			<label>
				First Name:
				<input type="text"></input>
			</label>
			<label>
				Last Name:
				<input type="text"></input>
			</label>
			<label>
				Email:
				<input type="email"></input>
			</label>
			<div>
				<label>
					Address: <input type="text"></input>
				</label>
				<label>
					State: <input type="text"></input>
				</label>
				<label>
					Zip: <input type="text"></input>
				</label>
			</div>
			<label>
				Use Same Address for Billing?
				<select>
					<option>Yes</option>
					<option>No</option>
				</select>
			</label>
		</div>
	);
};

export default GeneralAccountInfo;
