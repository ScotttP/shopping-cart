import React from "react";

const Account = (props) => {
	return (
		<div className="accountInformationDiv">
			<h2>First Name</h2>
			<h2>Last Name</h2>
			<p>Sample@gmail.com</p>
			<p>555-555-5555</p>
			<div id="cardInformation">
				<p>Card Number: 5555-5555-5555-5555</p>
				<p>Expiration Date: 10/22</p>
			</div>
		</div>
	);
};

export default Account;
