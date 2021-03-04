import React from "react";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import ShopItemCard from "./ShopItemCard";

const Shop = (props) => {
	const shopRendering = () => {
		if (props.filteredArray === undefined) return <div>LOADING</div>;
		else
			return props.filteredArray.map((element, index) => (
				<Link key={uniqid()} to={`/shop/${element.name}`}>
					<div key={uniqid()} className="itemCardContainer">
						<ShopItemCard
							key={uniqid()}
							index={index}
							data={element}
							addToCart={() => props.addToCart(element, index)}
						/>
					</div>
				</Link>
			));
	};

	return (
		<div id="shopContainer">
			<div id="filterContainer">
				<button onClick={props.handleFilter} className="viewAllClubsButton">
					All
				</button>
				<button onClick={props.handleFilter} className="viewDriversButton">
					Drivers
				</button>
				<button onClick={props.handleFilter} className="viewIronsButton">
					Irons
				</button>

				<button onClick={props.handleFilter} className="viewPuttersButton">
					Putters
				</button>
			</div>
			<div id="itemCardGridContainer">{shopRendering()}</div>
		</div>
	);
};

export default Shop;
