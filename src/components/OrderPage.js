import React from "react";
import Orders from "./Orders";
import Search from "./Search";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import a11ySpeak from "a11y-speak";
import util from "util";

const messages = defineMessages( {
	searchLabel: {
		id: "search.label.orders",
		defaultMessage: "Search orders",
	},
	ordersPageLoaded: {
		id: "menu.account.orders.loaded",
		defaultMessage: "Account orders page loaded",
	},
	searchResults: {
		id: "search.results",
		defaultMessage: "Number of orders found: %d",
	},
} );

/**
 * A function that returns the Order Page component, containing a search bar and the orders table.
 *
 * @returns {ReactElement} The component that contains the search bar and the order page.
 */
class OrderPage extends React.Component {
	/**
	 * Sets the OrderPage object.
	 *
	 * Used just to set the searchTimer, no need to pass props.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		this.debounceSearchResultsMessage = this.debounceSearchResultsMessage.bind( this );

		this.searchTimer = false;
	}

	/**
	 * Return the search bar.
	 *
	 * @returns {ReactElement} The rendered Search component.
	 */
	getSearch() {
		return <Search
			id="search"
			searchLabel={ this.props.intl.formatMessage( messages.searchLabel ) }
			descriptionId="search-description"
			onChange={ this.props.onSearchChange }
			query={ this.props.query }
		/>;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.ordersPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;
		return (
			<div>
				{ this.getSearch() }
				<Orders { ...this.props } onChange={ props.onSearchChange } query={ props.query }/>
			</div>
		);
	}

	componentWillReceiveProps( nextProps ) {
		/*
		 * While typing or pasting in the search field, `componentWillReceiveProps()`
		 * continously passes a new `query` props. We use this at our advantage
		 * to debounce the call to `a11ySpeak()`.
		 * Note: remember for <input> and <textarea>, React `onChange` behaves
		 * like the DOM's built-in oninput event handler.
		 */
		this.debounceSearchResultsMessage( nextProps );
	}

	/**
	 * Debounces `a11ySpeak()` and announces the search results to screen readers.
	 *
	 * @param {Object} nextProps The new props received by the component.
	 *
	 * @returns {void}
	 */
	debounceSearchResultsMessage( nextProps ) {
		/*
		 * Always clear any previously set timeout and then set it again. This
		 * is equivalent to debouncing the call to `a11ySpeak()`.
		 */
		window.clearTimeout( this.searchTimer );
		/*
		 * Only if the search query is not empty. Also, check if the query is
		 * different from the previous one: this ensures `a11ySpeak()` is not
		 * called when the component re-renders for other reasons, for example
		 * when opening the Add Site modal.
		 */
		if ( nextProps.query.length > 0 && ( this.props.query !== nextProps.query ) ) {
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.orders.length );

			this.searchTimer = window.setTimeout( function() {
				a11ySpeak( message, "assertive" );
			}, 1000 );
		}
	}

}

export default injectIntl( OrderPage );

OrderPage.propTypes = {
	getInvoiceURI: React.PropTypes.func.isRequired,
	onSearchChange: React.PropTypes.func.isRequired,
	orders: React.PropTypes.array,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
};
