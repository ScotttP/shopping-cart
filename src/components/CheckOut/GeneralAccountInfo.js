import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../components/firebaseConfig";
const firestore = firebase.firestore();

const GeneralAccountInfo = (props) => {
	console.log(props.currentUser.isAnonymous);
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
		if (!props.currentUser.isAnonymous) {
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
	}, []);

	const submit = () => {
		console.log("Submitted!");
		props.history.push("/ShipOptions");
	};

	const renderInputOrHeading = () => {
		if (props.currentUser.isAnonymous) {
			return (
				<div>
					<label>
						First Name:
						<input type="text" required></input>
					</label>
					<label>
						Last Name:
						<input type="text" required></input>
					</label>
					<label>
						Email:
						<input type="email" required></input>
					</label>
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
		<form onSubmit={() => submit()}>
			{renderInputOrHeading()}
			<div>
				<label>
					<h2>Shipping Address:</h2>
					<input
						id="streetAddressInputChange"
						type="text"
						onChange={(e) => setShipStreetAddress(e.target.value)}
						value={shipStreetAddress}
						required
					></input>
					City:
					<input
						id="cityInputChange"
						type="text"
						onChange={(e) => setShipCity(e.target.value)}
						value={shipCity}
						required
					></input>
					State:
					<input
						id="stateInputChange"
						type="text"
						onChange={(e) => setShipState(e.target.value)}
						value={shipState}
						required
					></input>
					Zip:
					<input
						id="zipcodeInputChange"
						type="text"
						onChange={(e) => setShipZipcode(e.target.value)}
						value={shipZipcode}
						required
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
						required
					></input>
					City:
					<input
						id="cityInputChange"
						type="text"
						onChange={(e) => setBillingCity(e.target.value)}
						value={billingCity}
						required
					></input>
					State:
					<input
						id="stateInputChange"
						type="text"
						onChange={(e) => setBillingState(e.target.value)}
						value={billingState}
						required
					></input>
					Zip:
					<input
						id="zipcodeInputChange"
						type="text"
						onChange={(e) => setBillingZipcode(e.target.value)}
						value={billingZipcode}
						required
					></input>
				</label>
			</div>

			<button type="submit">Shipping Options</button>
		</form>
	);
};

export default withRouter(GeneralAccountInfo);
