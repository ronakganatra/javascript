import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import Subscriptions from "./Subscriptions";
import Search from "./Search";
import a11ySpeak from "a11y-speak";
import util from "util";
import _debounce from "lodash/debounce";
import NoResults from "./NoResults";
import LandingPage from "./LandingPage";
import noSubscriptionsImage from "./../images/noSubscriptions.svg";
import noResultsImage from "./../images/SitesNoResults.svg";

const messages = defineMessages( {
	pageSubscriptionsLoaded: {
		id: "menu.account.subscriptions.loaded",
		defaultMessage: "Account subscriptions page loaded",
	},
	searchLabel: {
		id: "search.label.subscriptions",
		defaultMessage: "Search subscriptions",
	},
	searchResults: {
		id: "subscriptions-search.results",
		defaultMessage: "Number of subscriptions found: %d",
	},
} );

let debouncedSpeak = _debounce( a11ySpeak, 1000 );

/**
 * Returns the rendered SubscriptionsPage component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubscriptionsPage component.
 */
class SubscriptionsPage extends React.Component {
	/**
	 * Sets the SubscriptionsPage object.
	 *
	 * Used just to set the searchTimer, no need to pass props.
	 *
	 * @returns {void}
	 */
	constructor() {
		super();

		this.speakSearchResultsMessage = this.speakSearchResultsMessage.bind( this );
	}

	componentDidMount() {
		this.props.loadData();

		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.pageSubscriptionsLoaded );
		a11ySpeak( message );
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
			query={ this.props.query }
			onChange={ this.props.onSearchChange }
		/>;
	}

	render() {
		let noSubscriptionsParagraphs = [
			<FormattedMessage id="subscriptions.no-subscriptions.welcome" defaultMessage="Welcome to the subscriptions overview" />,
			<FormattedMessage id="subscriptions.no-subscriptions.manage"
							  defaultMessage="When you buy one of our plugins or services, a new subscription starts. Subscriptions automatically renew each year (or month),
so you can enjoy uninterrupted access to the product you bought, including free updates and new versions." />,
			<FormattedMessage id="subscriptions.no-subscriptions.press-button" defaultMessage="You don’t seem to have any subscriptions yet, so press the button below to visit our shop."/>,
		];
		let noSearchResultsParagraphs = [
			<FormattedMessage id="subscriptions.search.no-results"
							  defaultMessage={ "We could not find any subscriptions matching { query }." }
							  values={ { query: <strong>{ this.props.query }</strong> } } /> ];

		let props = this.props;

		if ( props.activeSubscriptions.length > 0 ) {
			return (
				<div>
					{ this.getSearch() }
					<Subscriptions { ...props } />
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					{ this.getSearch() }
					<LandingPage paragraphs={ noSearchResultsParagraphs }
								 imageSource={ noResultsImage }/>
				</div>
			);
		}
		return (
			<NoResults
				paragraphs={ noSubscriptionsParagraphs }
				onClick={ () => {
					window.open( "https://yoast.com/shop/" ).bind( this );
				} }
				imageSource={ noSubscriptionsImage }
				pageContext="noSubscriptions"
			/>
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
		this.speakSearchResultsMessage( nextProps );
	}

	speakSearchResultsMessage( nextProps ) {
		if ( nextProps.query.length > 0 && ( this.props.query !== nextProps.query ) ) {
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.activeSubscriptions.length );
			debouncedSpeak( message, "assertive" );
		}
	}
}

SubscriptionsPage.propTypes = {
	onSearchChange: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	query: PropTypes.string,
	loadData: PropTypes.func,
};

SubscriptionsPage.defaultProps = {
	loadData: () => {},
};

export default injectIntl( SubscriptionsPage );
