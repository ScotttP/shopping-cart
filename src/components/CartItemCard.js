import React from "react";

const CartItemCard = (props) => {
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
				</div>

				<div className="qtyAndRemoveButtonContainer">
					<div className="increaseOrDecreaseQtyContainer">
						<button
							className="decreaseQty"
							data-index={props.index}
							data-incart={props.inCart}
							onClick={(e) => props.onChangeQty(e)}
						>
							-
						</button>
						<p className="displayQty">{props.data.quantity}</p>
						<button
							className="increaseQty"
							data-index={props.index}
							data-incart={props.inCart}
							onClick={(e) => props.onChangeQty(e)}
						>
							+
						</button>
					</div>
					<button
						className="deleteFromCartButton"
						onClick={() => props.deleteFromCart(props.index)}
					>
						- Remove
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItemCard;
