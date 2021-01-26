import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../components/firebaseConfig";
const firestore = firebase.firestore();

const GeneralAccountInfo = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [shipStreetAddress, setShipStreetAddress] = useState("");
	const [shipCity, setShipCity] = useState("");
	const [shipState, setShipState] = useState("");
	const [shipZipcode, setShipZipcode] = useState("");
	const [billingStreetAddress, setBillingStreetAddress] = useState("");
	const [billingCity, setBillingCity] = useState("");
	const [billingState, setBillingState] = useState("");
	const [billingZipcode, setBillingZipcode] = useState("");

	const userRef = firestore.collection("users").doc(`${props.currentUser.uid}`);

	useEffect(() => {
		if (props.currentUser !== "") {
			userRef.get().then((doc) => {
				setFirstName(doc.data().firstName);
				setLastName(doc.data().lastName);
				setEmail(doc.data().email);
				setShipStreetAddress(doc.data().shipStreetAddress);
				setShipCity(doc.data().shipCity);
				setShipState(doc.data().shipState);
				setShipZipcode(doc.data().shipZipcode);
				setBillingStreetAddress(doc.data().billingStreetAddress);
				setBillingCity(doc.data().billingCity);
				setBillingState(doc.data().billingState);
				setBillingZipcode(doc.data().billingZipcode);
			});
		}
	}, [props.currentUser, userRef]);

	const submit = () => {
		console.log("Submitted!");
		console.log(props);
		props.history.push("/Payment");
	};

	const renderInputOrHeading = () => {
		if (props.currentUser.isAnonymous) {
			return (
				<div id="nameAndEmailDiv">
					<div>
						<h2>General Information:</h2>
						<p>
							<span style={{ color: "red", padding: 0 }}>* </span> is required
						</p>
					</div>

					<div className="inputFields">
						<label>
							First Name
							<input
								type="text"
								onChange={(e) => setFirstName(e.target.value)}
								placeholder={"John"}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Last Name:
							<input
								type="text"
								onChange={(e) => setLastName(e.target.value)}
								placeholder={"Smith"}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Email:
							<input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder={"JohnSmith@email.com"}
								required
							></input>
						</label>
					</div>
				</div>
			);
		} else {
			<div>
				<label>
					First Name:
					<h4>{firstName}</h4>
				</label>
				<label>
					Last Name:
					<h4>{lastName}</h4>
				</label>
				<label>
					Email:
					<h4>{email}</h4>
				</label>
			</div>;
		}
	};

	return (
		<form onSubmit={() => submit()} id="generalAccountInfoForm">
			{renderInputOrHeading()}
			<div id="shippingAndBillingAddressContainer">
				<div id="shippingAddressDiv">
					<h2>Shipping Address:</h2>
					<div className="inputFields">
						<label>
							Street Address
							<input
								className="streetAddressInputChange"
								type="text"
								onChange={(e) => setShipStreetAddress(e.target.value)}
								value={shipStreetAddress}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							City:
							<input
								className="cityInputChange"
								type="text"
								onChange={(e) => setShipCity(e.target.value)}
								value={shipCity}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							State:
							<input
								className="stateInputChange"
								type="text"
								onChange={(e) => setShipState(e.target.value)}
								value={shipState}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Zip:
							<input
								className="zipcodeInputChange"
								type="text"
								onChange={(e) => setShipZipcode(e.target.value)}
								value={shipZipcode}
								required
							></input>
						</label>
					</div>
				</div>
				<div id="billingAddressDiv">
					<h2>Billing Address:</h2>
					<div className="inputFields">
						<label>
							Street Address
							<input
								className="streetAddressInputChange"
								type="text"
								onChange={(e) => setBillingStreetAddress(e.target.value)}
								value={billingStreetAddress}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							City:
							<input
								className="cityInputChange"
								type="text"
								onChange={(e) => setBillingCity(e.target.value)}
								value={billingCity}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							State:
							<input
								className="stateInputChange"
								type="text"
								onChange={(e) => setBillingState(e.target.value)}
								value={billingState}
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Zip:
							<input
								className="zipcodeInputChange"
								type="text"
								onChange={(e) => setBillingZipcode(e.target.value)}
								value={billingZipcode}
								required
							></input>
						</label>
					</div>
				</div>
			</div>
			<div id="shippingOptionsDiv">
				<h2>Shipping Options: </h2>
				<div id="shippingOptionsInput">
					<div>
						{" "}
						Free - $0.00
						<input type="radio" name="shippingOption" required></input>
					</div>
					<div>
						Standard - $4.99
						<input name="shippingOption" type="radio"></input>
					</div>
					<div>
						Express - $9.99
						<input name="shippingOption" type="radio"></input>
					</div>
				</div>
			</div>

			<button className="nextSectionButton" onSubmit={() => submit()}>
				Payment Options
			</button>
		</form>
	);
};

export default withRouter(GeneralAccountInfo);
