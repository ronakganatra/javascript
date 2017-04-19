import React from "react";
import Orders from "./Orders";
import Search from "./Search";

let searchProps = {
	id: "orderSearchBar",
	description: "I am an order search bar",
	descriptionId: "I am an order search bar id",
	onChange: () => {
		console.log( " I HAVE CHANGED! " );
	},
};

/**
 * A function that returns the Order Page component, containing a search bar and the orders table.
 *
 * @param {Object} props The properties to be passed on.
 * @returns {ReactElement} The component that contains the search bar and the order page.
 */
export default function OrderPage( props ) {
	return(
		<div>
			<Search {...searchProps} />
			<Orders {...props} />
		</div>
	);
}
