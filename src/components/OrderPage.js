import React from "react";
import Orders from "./Orders";
import Search from "./Search";
import { defineMessages, injectIntl, intlShape } from "react-intl";

const messages = defineMessages( {
	searchLabel: {
		id: "search.label.orders",
		defaultMessage: "Search orders",
	},
} );

/**
 * A function that returns the Order Page component, containing a search bar and the orders table.
 *
 * @param {Object} props The properties to be passed on.
 * @returns {ReactElement} The component that contains the search bar and the order page.
 */
function OrderPage( props ) {
	let searchProps = props.searchProps;

	return(
		<div>
			<Search
				{ ...searchProps }
				id="search"
				searchLabel={ props.intl.formatMessage( messages.searchLabel ) }
				descriptionId="search-description"
			/>
			<Orders { ...props } />
		</div>
	);
}

export default injectIntl( OrderPage );

OrderPage.propTypes = {
	searchProps: React.PropTypes.object.isRequired,
	onClickInvoice: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
	intl: intlShape.isRequired,
};
