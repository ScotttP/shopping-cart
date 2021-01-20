import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../components/firebaseConfig";
const firestore = firebase.firestore();

const GeneralAccountInfo = (props) => {
	console.log(props.currentUser.uid);
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
	}, []);
	return (
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
			<div>
				<label>
					<h2>Shipping Address:</h2>
					<input
						id="streetAddressInputChange"
						type="text"
						onChange={(e) => setShipStreetAddress(e.target.value)}
						value={shipStreetAddress}
					></input>
					City:
					<input
						id="cityInputChange"
						type="text"
						onChange={(e) => setShipCity(e.target.value)}
						value={shipCity}
					></input>
					State:
					<input
						id="stateInputChange"
						type="text"
						onChange={(e) => setShipState(e.target.value)}
						value={shipState}
					></input>
					Zip:
					<input
						id="zipcodeInputChange"
						type="text"
						onChange={(e) => setShipZipcode(e.target.value)}
						value={shipZipcode}
					></input>
				</label>
			</div>
			<div>
				<label>
					<h2>Billing Address:</h2>
					<input
						id="streetAddressInputChange"
						type="text"
						onChange={(e) => setBillingStreetAddress(e.target.value)}
						value={billingStreetAddress}
					></input>
					City:
					<input
						id="cityInputChange"
						type="text"
						onChange={(e) => setBillingCity(e.target.value)}
						value={billingCity}
					></input>
					State:
					<input
						id="stateInputChange"
						type="text"
						onChange={(e) => setBillingState(e.target.value)}
						value={billingState}
					></input>
					Zip:
					<input
						id="zipcodeInputChange"
						type="text"
						onChange={(e) => setBillingZipcode(e.target.value)}
						value={billingZipcode}
					></input>
				</label>
			</div>

			<Link to="/ShipOptions">
				<button>Shipping Options</button>
			</Link>
		</div>
	);
};

export default GeneralAccountInfo;
