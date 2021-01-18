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

	const handleChange = (e) => {
		if (e.target.id === "firstNameInputChange") {
			return setFirstName(e.target.value);
		} else if (e.target.id === "lastNameInputChange") {
			return setLastName(e.target.value);
		} else if (e.target.id === "emailInputChange") {
			setEmail(e.target.value);
		} else if (e.target.id === "cardNumberInputChange") {
			setCardNumber(e.target.value);
		} else {
			setExpirationDate(e.target.value);
		}
	};

	if (editMode) {
		return (
			<div id="accountInformationEditMode">
				<label>
					First Name:
					<input
						id="firstNameInputChange"
						onChange={(e) => handleChange(e)}
						value={firstName}
					></input>
				</label>
				<label>
					Last Name:
					<input
						id="lastNameInputChange"
						onChange={(e) => handleChange(e)}
						value={lastName}
					></input>
				</label>
				<label>
					Email:
					<input
						id="emailInputChange"
						onChange={(e) => handleChange(e)}
						value={email}
					></input>
				</label>

				<button onClick={() => sendPasswordResetEmail()}>
					Change Password
				</button>

				<label>
					Card Number:
					<input
						id="cardNumberInputChange"
						onChange={(e) => handleChange(e)}
						value={cardNumber}
					></input>
				</label>
				<label>
					Expiration Date:
					<input
						id="expirationDateInputChange"
						onChange={(e) => handleChange(e)}
						value={expirationDate}
					></input>
				</label>

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
