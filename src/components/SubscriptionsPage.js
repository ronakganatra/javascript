import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import Subscriptions from "./Subscriptions";
import Search from "./Search";
import a11ySpeak from "a11y-speak";
import util from "util";

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

		this.debounceSearchResultsMessage = this.debounceSearchResultsMessage.bind( this );

		this.searchTimer = false;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.pageSubscriptionsLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;

		return (
			<div>
				<Search
					id="search"
					searchLabel={ this.props.intl.formatMessage( messages.searchLabel ) }
					descriptionId="search-description"
					query={ this.props.query }
					onChange={ this.props.onSearchChange }
				/>
				<Subscriptions { ...props } />
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
		console.log( nextProps );
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
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.subscriptions.length );

			this.searchTimer = window.setTimeout( function() {
				a11ySpeak( message, "assertive" );
			}, 1000 );
		}
	}
}

SubscriptionsPage.propTypes = {
	onSearchChange: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
};

export default injectIntl( SubscriptionsPage );
