import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import Subscriptions from "./Subscriptions";
import Search from "./Search";
import { speak } from "@wordpress/a11y";
import util from "util";
import _debounce from "lodash/debounce";
import SuggestedAction from "./SuggestedAction";
import { GoToButtonLink } from "./Button";
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
		id: "subscriptionsSearch.results",
		defaultMessage: "Number of subscriptions found: %d",
	},
} );

const debouncedSpeak = _debounce( speak, 1000 );

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
	 * Sends the number of subscriptions found in the search results to the screenreader.
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
		const message = this.props.intl.formatMessage( messages.pageSubscriptionsLoaded );
		speak( message );
	}

	componentWillReceiveProps( nextProps ) {
		/*
		 * While typing or pasting in the search field, `componentWillReceiveProps()`
		 * continuously passes a new `query` props. We use this at our advantage
		 * to debounce the call to `speak()`.
		 * Note: remember for <input> and <textarea>, React `onChange` behaves
		 * like the DOM's built-in oninput event handler.
		 */
		this.speakSearchResultsMessage( nextProps );
	}

	speakSearchResultsMessage( nextProps ) {
		if ( nextProps.query.length > 0 && this.props.query !== nextProps.query ) {
			const message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.subscriptions.length );
			debouncedSpeak( message, "assertive" );
		}
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

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const noSubscriptionsParagraphs = [
			<FormattedMessage
				id="subscriptions.noSubscriptions.welcome"
				defaultMessage="Welcome to the subscriptions overview."
			/>,
			<FormattedMessage
				id="subscriptions.noSubscriptions.manage"
				defaultMessage="When you buy one of our plugins or services, you start a new subscription which will be billed
							  annually. At the end of each billing cycle you can choose to renew your subscription or let it expire."
			/>,
			<FormattedMessage
				id="subscriptions.noSubscriptions.pressButton"
				defaultMessage="You don’t seem to have any subscriptions yet, so press the button below to visit our shop."
			/>,
		];
		const noSearchResultsParagraphs = [
			<FormattedMessage
				id="subscriptions.search.noResults"
				defaultMessage={ "We could not find any subscriptions matching { query }." }
				values={ { query: <strong>{ this.props.query }</strong> } }
			/> ];

		const props = this.props;

		if ( props.subscriptions.length > 0 ) {
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
					<SuggestedAction
						paragraphs={ noSearchResultsParagraphs }
						imageSource={ noResultsImage }
					/>
				</div>
			);
		}
		return (
			<SuggestedAction
				paragraphs={ noSubscriptionsParagraphs }
				imageSource={ noSubscriptionsImage }
			>
				<GoToButtonLink />
			</SuggestedAction>
		);
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
