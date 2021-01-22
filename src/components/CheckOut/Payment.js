import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import firebase from "../../components/firebaseConfig";

import "firebase/firestore";

const firestore = firebase.firestore();

const Payment = (props) => {
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cardCode, setCardCode] = useState("");
	const userRef = firestore.collection("users").doc(`${props.currentUser.uid}`);
	useEffect(() => {
		userRef.get().then((doc) => {
			if (!props.currentUser.isAnonymous) {
				setCardNumber(doc.data().cardNumber);
				setExpirationDate(doc.data().expirationDate);
			}
		});
	}, []);
	return (
		<div>
			<label>
				Card Number:
				<input
					id="cardNumberInputChange"
					onChange={(e) => setCardNumber(e.target.value)}
					value={cardNumber}
					required
				></input>
			</label>
			<label>
				Expiration Date:
				<input
					id="expirationDateInputChange"
					onChange={(e) => setExpirationDate(e.target.value)}
					value={expirationDate}
					required
				></input>
			</label>
			<label>
				3 to 4 Digit Code:
				<input
					id="codeInputChange"
					onChange={(e) => setCardCode(e.target.value)}
					value={cardCode}
					required
				></input>
			</label>
			<Link to="/Review">
				<button onClick={props.setAsInReview}>Review Order</button>
			</Link>
		</div>
	);
};

export default Payment;
