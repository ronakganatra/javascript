import PropTypes from "prop-types";
import React from "react";
import Orders from "./Orders";
import Search from "./Search";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import { speak } from "@wordpress/a11y";
import util from "util";
import _debounce from "lodash/debounce";
import SuggestedAction from "./SuggestedAction";
import { GoToButtonLink } from "./Buttons";
import noOrdersImage from "./../images/noOrders.svg";
import noResultsImage from "./../images/SitesNoResults.svg";

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
		id: "ordersSearch.results",
		defaultMessage: "Number of orders found: %d",
	},
} );

const debouncedSpeak = _debounce( speak, 1000 );

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

		this.speakSearchResultsMessage = this.speakSearchResultsMessage.bind( this );
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
		this.props.loadData();

		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.ordersPageLoaded );
		speak( message );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const props = this.props;

		const noOrdersParagraphs = [

			<FormattedMessage id="orders.noOrders.welcome" defaultMessage="Welcome to the orders overview." />,
			<FormattedMessage
				id="orders.noOrders.manage"
				defaultMessage="Here you can find a list of your orders - but it looks like you didn't order anything yet!"
			/>,
			<FormattedMessage id="orders.noOrders.pressButton" defaultMessage="Press the button below to visit our shop and get your first product." />,
		];
		const noSearchResultsParagraphs = [
			<FormattedMessage
				id="orders.search.noResults"
				defaultMessage={ "We could not find any orders matching { query }." }
				values={ { query: <strong>{ this.props.query }</strong> } }
			/> ];

		if ( props.orders.length > 0 ) {
			return (
				<div>
					{ this.getSearch() }
					<Orders { ...this.props } onChange={ props.onSearchChange } query={ props.query } />
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					{ this.getSearch() }
					<SuggestedAction paragraphs={ noSearchResultsParagraphs } imageSource={ noResultsImage } />
				</div>
			);
		}
		return (
			<SuggestedAction
				paragraphs={ noOrdersParagraphs }
				imageSource={ noOrdersImage }
			>
				<GoToButtonLink />
			</SuggestedAction>
		);
	}

	componentWillReceiveProps( nextProps ) {
		/*
		 * While typing or pasting in the search field, `componentWillReceiveProps()`
		 * continously passes a new `query` props. We use this at our advantage
		 * to debounce the call to `speak()`.
		 * Note: remember for <input> and <textarea>, React `onChange` behaves
		 * like the DOM's built-in oninput event handler.
		 */
		this.speakSearchResultsMessage( nextProps );
	}

	speakSearchResultsMessage( nextProps ) {
		if ( nextProps.query.length > 0 && ( this.props.query !== nextProps.query ) ) {
			const message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.orders.length );
			debouncedSpeak( message, "assertive" );
		}
	}
}

export default injectIntl( OrderPage );

OrderPage.propTypes = {
	onSearchChange: PropTypes.func.isRequired,
	orders: PropTypes.array,
	intl: intlShape.isRequired,
	query: PropTypes.string,
	loadData: PropTypes.func,
};

OrderPage.defaultProps = {
	loadData: () => {},
};
