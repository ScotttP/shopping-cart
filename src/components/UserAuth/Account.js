import React, { useEffect, useState } from "react";
import firebase from "../../components/firebaseConfig";
import { Link } from "react-router-dom";

import "firebase/auth";
import "firebase/firestore";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const Account = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [shipStreetAddress, setShipStreetAddress] = useState("");
	const [shipCity, setShipCity] = useState("");
	const [shipStateAddress, setShipStateAddress] = useState("");
	const [shipZipcode, setShipZipcode] = useState("");
	const [billingStreetAddress, setBillingStreetAddress] = useState("");
	const [billingCity, setBillingCity] = useState("");
	const [billingStateAddress, setBillingStateAddress] = useState("");
	const [billingZipcode, setBillingZipcode] = useState("");
	const [editMode, setEditMode] = useState(false);

	const userRef = firestore.collection("users").doc(`${props.currentUser.uid}`);
	console.log(props.currentUser.uid);

	useEffect(() => {
		userRef.get().then((doc) => {
			setFirstName(doc.data().firstName);
			setLastName(doc.data().lastName);
			setEmail(doc.data().email);
			setPassword(doc.data().password);
			setCardNumber(doc.data().cardNumber);
			setExpirationDate(doc.data().expirationDate);
		});
	}, []);

	const wrapper = () => {
		setEditMode(false);
		updateUserAccountInFirestore();
		props.currentUser
			.updateEmail(email)
			.then(() => {
				props.currentUser.updateProfile({
					displayName: `${firstName}`,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const updateUserAccountInFirestore = async () => {
		await userRef.update({
			firstName: firstName,
			lastName: lastName,
			email: email,
			userID: props.currentUser.uid,
			cardNumber: cardNumber,
			expirationDate: expirationDate,
			shipStreetAddress: shipStreetAddress,
			shipCity: shipCity,
			shipState: shipStateAddress,
			shipZipcode: shipZipcode,
			billingStreetAddress: billingStreetAddress,
			billingCity: billingCity,
			billingState: billingStateAddress,
			billingZipcode: billingZipcode,
		});
	};

	const deleteAccount = () => {
		props.currentUser
			.delete()
			.then(userRef.delete())
			.catch(function (error) {
				console.log(error);
			});
	};

	const sendPasswordResetEmail = () => {
		firebaseAuth
			.sendPasswordResetEmail(email)
			.then(function () {
				console.log("password reset sent");
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	if (editMode) {
		return (
			<div id="accountInformationEditMode">
				<label>
					First Name:
					<input
						id="firstNameInputChange"
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					></input>
				</label>
				<label>
					Last Name:
					<input
						id="lastNameInputChange"
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					></input>
				</label>
				<label>
					Email:
					<input
						id="emailInputChange"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					></input>
				</label>

				<button onClick={() => sendPasswordResetEmail()}>
					Change Password
				</button>

				<div>
					<h2>Shipping Info</h2>
					<label>
						Shipping Address:
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
							onChange={(e) => setShipStateAddress(e.target.value)}
							value={shipStateAddress}
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
					<h2>Payment Info</h2>
					<label>
						Card Number:
						<input
							id="cardNumberInputChange"
							onChange={(e) => setCardNumber(e.target.value)}
							value={cardNumber}
						></input>
					</label>
					<label>
						Expiration Date:
						<input
							id="expirationDateInputChange"
							onChange={(e) => setExpirationDate(e.target.value)}
							value={expirationDate}
						></input>
					</label>
					<label>
						<h4>Billing Address:</h4>
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
							onChange={(e) => setBillingStateAddress(e.target.value)}
							value={billingStateAddress}
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

				<button onClick={() => wrapper()}>Save</button>
				<button onClick={props.signOut}> Sign Out</button>
				<button onClick={() => deleteAccount()}>Delete Account</button>
			</div>
		);
	} else
		return (
			<div className="accountInformationDiv">
				<h2>{firstName}</h2>
				<h2>{lastName}</h2>
				<p>{email}</p>
				<br></br>
				<div>
					<h3>Shipping Info: </h3>
					<p>
						<b>Street:</b> {shipStreetAddress}
					</p>
					<p>
						<b>City:</b> {shipCity}
					</p>
					<p>
						<b>State:</b> {shipStateAddress}
					</p>
					<p>
						<b>Zip:</b> {shipZipcode}
					</p>
				</div>
				<br></br>
				<div id="cardInformation">
					<h3>Payment Info:</h3>
					<p>Card Number: {cardNumber}</p>
					<p>Expiration Date: {expirationDate}</p>
					<br></br>
					<h4>Billing Address </h4>

					<p>
						<b>Street:</b> {billingStreetAddress}
					</p>
					<p>
						<b>City:</b> {billingCity}
					</p>
					<p>
						<b>State:</b> {billingStateAddress}
					</p>
					<p>
						<b>Zip:</b> {billingZipcode}
					</p>
				</div>
				<button onClick={() => setEditMode(true)}>Edit</button>
				<button onClick={props.signOut}> Sign Out</button>
			</div>
		);
};

export default Account;
