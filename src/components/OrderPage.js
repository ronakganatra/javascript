import React from "react";
import Orders from "./Orders";
import Search from "./Search";

/**
 * A function that returns the Order Page component, containing a search bar and the orders table.
 *
 * @param {Object} props The properties to be passed on.
 * @returns {ReactElement} The component that contains the search bar and the order page.
 */
export default function OrderPage( props ) {
	let searchProps = props.searchProps;

	return(
		<div>
			<Search {...searchProps} />
			<Orders {...props} />
		</div>
	);
}

OrderPage.propTypes = {
	searchProps: React.PropTypes.object.isRequired,
	onClickInvoice: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
};
