import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import itemList from "./itemList";
import styled from "styled-components";
import firebase from "../components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const ItemDetailsDiv = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
`;

const ProductInformation = styled.div`
	margin: 5%;
	display: flex;

	border: 1px solid #c4bdbd;
	height: 40vh;
	width: 50vw;
`;

const RightProductInformation = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	& > * {
		margin: 2% 0 2% 0;
	}
`;

const OptionsDiv = styled.div``;

const ItemDetails = (props) => {
	const { productName } = useParams();
	const [configurationType, setConfigurationType] = useState("");
	const [shaftType, setShaftType] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [quantity, setQuantity] = useState(1);

	const product = itemList.find((product) => product.name === productName);
	const productsRef = firestore
		.collection("products")
		.doc(`${productName.replace(/\s+/g, "-")}`);

	const userRef = firestore.collection("users").doc(`${props.currentUser.uid}`);

	const getPrice = () => {
		productsRef
			.get()
			.then((doc) => {
				setProductPrice(doc.data().price);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const addItemToCart = async () => {
		await userRef.collection("cart").add({
			productName: productName,
			price: productPrice,
			quantity: quantity,
			configuration: configurationType,
			shaft: shaftType,
		});
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

	useEffect(() => {
		getPrice();
	}, []);

	return (
		<ItemDetailsDiv>
			<ProductInformation>
				<img
					className="productImagesInShop"
					src={product.image}
					alt={product.name}
				></img>
				<RightProductInformation>
					<h1>{product.name}</h1>
					<p>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(product.price)}
					</p>
					<p>
						Our obsession with helping golfers improve has driven us beyond the
						traditional. We have reinvented the shape of the driver to deliver a
						new level of Speed and Forgiveness...
					</p>

					<OptionsDiv>
						<div>
							<label>Configuration: </label>
							<select
								onChange={(e) => setConfigurationType(e.target.value)}
								required
							>
								<option>Right</option>
								<option>Left</option>
							</select>
						</div>
						<div>
							<label>Shaft: </label>
							<select onChange={(e) => setShaftType(e.target.value)} required>
								<option>Regular</option>
								<option>Stiff</option>
							</select>
						</div>
						<div className="increaseOrDecreaseQtyContainer">
							<button className="decreaseQty" onClick={(e) => changeQty(e)}>
								-
							</button>
							<p className="displayQty">{quantity}</p>
							<button className="increaseQty" onClick={(e) => changeQty(e)}>
								+
							</button>
						</div>
						<button className="addToCartButton" onClick={() => addItemToCart()}>
							+ Add to Cart
						</button>
					</OptionsDiv>
				</RightProductInformation>
			</ProductInformation>
		</ItemDetailsDiv>
	);
};

export default ItemDetails;
