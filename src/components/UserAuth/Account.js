import React, { useEffect, useState } from "react";
import firebase from "../../components/firebaseConfig";
import { Link } from "react-router-dom";

import "firebase/auth";
import "firebase/firestore";

const firestore = firebase.firestore();

const Account = (props) => {
	// console.log(props.currentUser);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [editMode, setEditMode] = useState(false);

	const userRef = firestore.collection("users").doc(`${props.currentUser.uid}`);

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
		updateUserAccount();
	};

	const updateUserAccount = async () => {
		await userRef.update({
			firstName: "updatedFirstName",
			lastName: "signUpLastName",
			email: "signUpEmail",
			password: "",
			userID: props.currentUser.uid,
			cardNumber: "",
			expirationDate: "",
			isAnonymous: false,
		});
	};

	if (editMode) {
		return (
			<div>
				Edit mode
				<button onClick={() => wrapper()}>Save</button>
				<button onClick={props.signOut}> Sign Out</button>
			</div>
		);
	} else
		return (
			<div className="accountInformationDiv">
				<h2>{firstName}</h2>
				<h2>{lastName}</h2>
				<p>{email}</p>
				<p>Password: {password}</p>
				<div id="cardInformation">
					<p>Card Number: {cardNumber}</p>
					<p>Expiration Date: {expirationDate}</p>
				</div>
				<button onClick={() => setEditMode(true)}>Edit</button>
				<button onClick={props.signOut}> Sign Out</button>
			</div>
		);
};

export default Account;
