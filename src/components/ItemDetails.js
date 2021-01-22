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
	const [quantity, setQuantity] = useState(0);
	const [productImage, setProductImage] = useState(0);

	const product = itemList.find((product) => product.name === productName);
	const productsRef = firestore
		.collection("products")
		.doc(`${productName.replace(/\s+/g, "-")}`);

	const getPrice = () => {
		productsRef
			.get()
			.then((doc) => {
				setProductPrice(doc.data().price);
				setProductImage(doc.data().image);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const addItemToCart = async () => {
		if (firebaseAuth.currentUser) {
			const userRef = firestore
				.collection("users")
				.doc(`${firebaseAuth.currentUser.uid}`);
			try {
				userRef.collection("cart").add({
					productName: productName,
					image: productImage,
					price: productPrice,
					quantity: quantity,
					configuration: configurationType,
					shaft: shaftType,
				});
			} catch (error) {
				console.log(error);
			}
		}

		//setQuantity(0);
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
					src={productImage}
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
								defaultValue="Right"
							>
								<option value="Right">Right</option>
								<option value="Left">Left</option>
							</select>
						</div>
						<div>
							<label>Shaft: </label>
							<select
								onChange={(e) => setShaftType(e.target.value)}
								defaultValue="Regular"
								required
							>
								<option>Regular</option>
								<option value="Stiff">Stiff</option>
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
