import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../../components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CartItemCard from "../../components/CartItemCard";
import uniqid from "uniqid";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const Review = (props) => {
	const [uid, setUid] = useState(() => {
		if (firebaseAuth.currentUser === null) {
			return localStorage.getItem("uid");
		} else {
			return firebaseAuth.currentUser.uid;
		}
	});

	const userCartRef = firestore
		.collection("users")
		.doc(`${uid}`)
		.collection("cart");
	const userCartQuery = userCartRef.orderBy("productName", "asc");

	const [cartList] = useCollectionData(userCartQuery, { idField: "id" });

	console.log(uid);

	const render = () => {
		if (cartList === undefined) {
			return <div>LOADING</div>;
		} else
			return cartList.map((element, index) => (
				<div className="cartItemCardContainer" key={uniqid()}>
					<CartItemCard
						key={uniqid()}
						id={element.id}
						index={index}
						uid={props.uid}
						data={element}
						onChangeQty={(e) => props.onChangeQty(e)}
						inCart={true}
						deleteFromCart={() => props.deleteFromCart(element, index)}
					/>
				</div>
			));
	};

	return (
		<div>
			{render()}
			<Link to="/checkout-complete">
				<button>Submit Order</button>
			</Link>
		</div>
	);
};

export default Review;
