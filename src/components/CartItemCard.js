import React, { useEffect, useState } from "react";
import firebase from "../components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const CartItemCard = (props) => {
	const [quantity, setQuantity] = useState(props.data.quantity);

	const userCartRef = firestore
		.collection("users")
		.doc(`${props.uid}`)
		.collection("cart");

	const deleteItemFromCart = () => {
		userCartRef
			.doc(`${props.data.id}`)
			.delete()
			.catch((error) => console.log(error));
	};
	const changeQty = (e) => {
		if (e.target.className === "increaseQty") {
			setQuantity((prevState) => {
				return ++prevState;
			});
		} else {
			if (quantity <= 0) return;
			else
				setQuantity((prevState) => {
					if (prevState <= 0) return;
					else return --prevState;
				});
		}
	};

	const updateItemToCart = async () => {
		await userCartRef
			.doc(`${props.data.id}`)
			.update({
				quantity: quantity,
			})
			.catch((error) => console.error(error));
		console.log(props.data.id);
	};
	useEffect(() => {
		updateItemToCart();
	}, [quantity]);

	return (
		<div className="cartItemCard">
			<div className="cartImageDiv">
				<img
					className="productImagesInCart"
					src={props.data.image}
					alt={props.data.name}
				></img>
			</div>
			<div className="cartItemInfoDiv">
				<div className="itemNameAndPriceContainer">
					<h3>{props.data.name}</h3>
					<p>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(props.data.price)}
					</p>
					<p>
						<b>Shaft Type: </b> {props.data.shaft}
					</p>
					<p>
						<b>Configuration:</b> {props.data.configuration}
					</p>
				</div>

				<div className="qtyAndRemoveButtonContainer">
					<div className="increaseOrDecreaseQtyContainer">
						<button
							className="decreaseQty"
							data-index={props.index}
							data-incart={props.inCart}
							onClick={(e) => changeQty(e)}
						>
							-
						</button>
						<p className="displayQty">{props.data.quantity}</p>
						<button
							className="increaseQty"
							data-index={props.index}
							data-incart={props.inCart}
							onClick={(e) => changeQty(e)}
						>
							+
						</button>
					</div>
					<button
						className="deleteFromCartButton"
						onClick={() => deleteItemFromCart()}
					>
						- Remove
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItemCard;
