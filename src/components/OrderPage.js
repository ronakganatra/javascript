import React from "react";
import Orders from "./Orders";
import Search from "./Search";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import a11ySpeak from "a11y-speak";

const messages = defineMessages( {
	searchLabel: {
		id: "search.label.orders",
		defaultMessage: "Search orders",
	},
	ordersPageLoaded: {
		id: "menu.account.orders.loaded",
		defaultMessage: "Account orders page loaded",
	},
} );

/**
 * A function that returns the Order Page component, containing a search bar and the orders table.
 *
 * @param {Object} props The properties to be passed on.
 * @returns {ReactElement} The component that contains the search bar and the order page.
 */
class OrderPage extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.ordersPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let searchProps = this.props.searchProps;
		return (
			<div>
				<Search
					{ ...searchProps }
					id="search"
					searchLabel={ this.props.intl.formatMessage( messages.searchLabel ) }
					descriptionId="search-description"
				/>
				<Orders { ...this.props } />
			</div>
		);
	}
}

export default injectIntl( OrderPage );

OrderPage.propTypes = {
	searchProps: React.PropTypes.object.isRequired,
	orders: React.PropTypes.array,
	intl: intlShape.isRequired,
};
