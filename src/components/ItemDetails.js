import React from "react";
import { useParams } from "react-router-dom";
import itemList from "./itemList";
import styled from "styled-components";

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

	const product = itemList.find((product) => product.name === productName);

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
							<select>
								<option>Right</option>
								<option>Left</option>
							</select>
						</div>
						<div>
							<label>Shaft: </label>
							<select>
								<option>Regular</option>
								<option>Stiff</option>
							</select>
						</div>
						<button
							className="addToCartButton"
							onClick={() => props.addToCart(product)}
						>
							+ Add to Cart
						</button>
					</OptionsDiv>
				</RightProductInformation>
			</ProductInformation>
		</ItemDetailsDiv>
	);
};

export default ItemDetails;
