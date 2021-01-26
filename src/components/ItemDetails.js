import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
	@media only screen and (max-width: 884px) {
		height: 110vh;
	}
	@media only screen and (max-width: 730px) {
		height: 150vh;
	}
	@media only screen and (max-width: 500px) {
		height: 130vh;
	}
	@media only screen and (max-width: 320px) {
		height: 180vh;
	}
`;

const ProductInformation = styled.div`
	margin-top: 4%;

	display: flex;
	padding: 2%;
	border: 1px solid #c4bdbd;
	height: fit-content;

	width: 65vw;
	max-width: 1000px;

	@media only screen and (max-width: 1275px) {
		width: 85vw;
	}
	@media only screen and (max-width: 884px) {
		flex-direction: column;
	}
`;

const RightProductInformation = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2% 2% 2% 5%;
	& > * {
		margin: 2% 0 2% 0;
	}
	@media only screen and (max-width: 884px) {
		padding: 2% 10% 2% 10%;
	}
`;

const ItemDetails = (props) => {
	const { productName } = useParams();
	const [configurationType, setConfigurationType] = useState("");
	const [shaftType, setShaftType] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [productImage1, setProductImage1] = useState("");
	const [productImage2, setProductImage2] = useState("");
	const [productImage3, setProductImage3] = useState("");
	const [productImage4, setProductImage4] = useState("");

	const productsRef = firestore
		.collection("products")
		.doc(`${productName.replace(/\s+/g, "-")}`);

	const getPrice = () => {
		productsRef
			.get()
			.then((doc) => {
				setProductPrice(doc.data().price);
				setProductImage1(doc.data().image);
				setProductImage2(doc.data().image2);
				setProductImage3(doc.data().image3);
				setProductImage4(doc.data().image4);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const addItemToCart = async (e) => {
		e.preventDefault();

		if (quantity <= 0) return;
		if (firebaseAuth.currentUser) {
			const userRef = firestore
				.collection("users")
				.doc(`${firebaseAuth.currentUser.uid}`);
			try {
				userRef.collection("cart").add({
					productName: productName,
					image: productImage1,
					price: productPrice,
					quantity: quantity,
					configuration: configurationType,
					shaft: shaftType,
				});
			} catch (error) {
				console.log(error);
			}
		}

		setQuantity(0);
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

	const updatingActiveImage = (e) => {
		let activeImages = document.getElementsByClassName("active");

		if (activeImages.length > 0) {
			activeImages[0].classList.remove("active");
		}
		e.target.classList.add("active");
		document.getElementById("featured").src = e.target.src;
	};

	useEffect(() => {
		getPrice();
	}, [productName]);

	useEffect(() => {
		if (quantity !== 0 && shaftType !== "" && configurationType !== "") {
			document.getElementsByClassName("addToCartButton").disabled = false;
		} else {
			document.getElementsByClassName("addToCartButton").disabled = true;
		}
	});

	console.log(document.getElementsByClassName("addToCartButton").disabled);

	return (
		<ItemDetailsDiv>
			<ProductInformation>
				<div className="productImageDiv">
					<img
						className="thumbnailImages"
						id="featured"
						src={productImage1}
						alt={productName}
					></img>
					<div className="sliderWrapper">
						<img
							className="thumbnailImages active"
							src={productImage1}
							alt={productName}
							onMouseOver={(e) => updatingActiveImage(e)}
						></img>
						<img
							className="thumbnailImages"
							src={productImage2}
							alt={productName}
							onMouseOver={(e) => updatingActiveImage(e)}
						></img>
						<img
							className="thumbnailImages"
							src={productImage3}
							alt={productName}
							onMouseOver={(e) => updatingActiveImage(e)}
						></img>
						<img
							className="thumbnailImages"
							src={productImage4}
							alt={productName}
							onMouseOver={(e) => updatingActiveImage(e)}
						></img>
					</div>
				</div>

				<RightProductInformation>
					<h1>{productName}</h1>
					<p>
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(productPrice)}
					</p>
					<p>
						Our obsession with helping golfers improve has driven us beyond the
						traditional. We have reinvented the shape of the driver to deliver a
						new level of Speed and Forgiveness...
					</p>

					<form onSubmit={(e) => addItemToCart(e)}>
						<div className="config">
							<label>Configuration </label>
							<select
								onChange={(e) => setConfigurationType(e.target.value)}
								required
								defaultValue="Select"
							>
								<option value="">Select</option>
								<option value="Right">Right</option>
								<option value="Left">Left</option>
							</select>
						</div>
						<div className="shaft">
							<label>Shaft </label>
							<select
								onChange={(e) => setShaftType(e.target.value)}
								defaultValue="Select"
								required
							>
								<option value="">Select</option>
								<option value="Regular">Regular</option>
								<option value="Stiff">Stiff</option>
							</select>
						</div>
						<div className="qtyChangeandAddToCartContainer">
							<div className="increaseOrDecreaseQtyContainer">
								<button
									type="button"
									className="decreaseQty"
									onClick={(e) => changeQty(e)}
								>
									-
								</button>
								<p className="displayQty">{quantity}</p>
								<button
									type="button"
									className="increaseQty"
									onClick={(e) => changeQty(e)}
								>
									+
								</button>
							</div>
							<div className="itemDetailsButtonDiv">
								<button className="addToCartButton" type="submit">
									+ Add to Cart
								</button>
							</div>
						</div>
					</form>
				</RightProductInformation>
			</ProductInformation>
		</ItemDetailsDiv>
	);
};

export default ItemDetails;
