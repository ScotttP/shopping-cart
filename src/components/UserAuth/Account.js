import React, { useEffect, useState } from "react";
import firebase from "../../components/firebaseConfig";

import "firebase/auth";
import "firebase/firestore";

const firestore = firebase.firestore();

const Account = (props) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");

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
		</div>
	);
};

export default Account;
