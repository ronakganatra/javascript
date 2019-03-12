import PropTypes from "prop-types";
import React from "react";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import Subscriptions from "./Subscriptions";
import Search from "../../Search";
import { speak } from "@wordpress/a11y";
import util from "util";
import _debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import SuggestedAction from "../../SuggestedAction";
import { GoToButtonLink } from "../../Button";
import noSubscriptionsImage from "../../../images/noSubscriptions.svg";
import noResultsImage from "../../../images/SitesNoResults.svg";
import SubscriptionDetailModal from "../../modal/SubscriptionDetailModal";

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
	 * @param {Object} props The props that get passed through.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
		this.state = {
			modalOpen: false,
			url: null,
		};
		this.speakSearchResultsMessage = this.speakSearchResultsMessage.bind( this );
		this.showDetailsModal = this.showDetailsModal.bind( this );
		this.closeDetailsModal = this.closeDetailsModal.bind( this );
	}

	/**
	 * Function to show the payment details modal
	 * @param {string} url The URL where the button links to
	 * @returns {void}
	 */
	showDetailsModal( url ) {
		this.setState( {
			modalOpen: true,
			url: url,
		} );
	}

	/**
	 * Function to close the detail modal
	 * @returns {void}
	 */
	closeDetailsModal() {
		this.setState( {
			modalOpen: false,
			url: null,
		} );
	}

	/**
	 * Function to execute when the component mounts.
	 * @returns {void}
	 */
	componentDidMount() {
		this.props.loadData();

		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.pageSubscriptionsLoaded );
		speak( message );
	}

	/**
	 * Function that is executed if the component will receive new props.
	 * @param {Object} nextProps The props that the component has in the next state.
	 * @returns {void}
	 */
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

	/**
	 * Function to translate the spoken to text to written text
	 * @param {object} nextProps The props of the next state
	 * @returns {void}
	 */
	speakSearchResultsMessage( nextProps ) {
		if ( nextProps.query.length > 0 && this.props.query !== nextProps.query ) {
			// Combine grouped and individual subscriptions objects and count them.
			const combinedResultCount = [
				Object.values( nextProps.groupedSubscriptions ),
				Object.values( nextProps.individualSubscriptions ),
			].flat( 2 ).length;

			const message = util.format( this.props.intl.formatMessage( messages.searchResults ), combinedResultCount );
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
	 * Function that shows the modal if open and if the URL is defined
	 * @param {boolean} open Whether the modal is open
	 * @param {string} url The renewal URL
	 * @returns {(null|SubscriptionDetailModal)} null if there is no need to show the modal, the modal otherwise
	 */
	modal( open, url ) {
		if ( open && url !== null ) {
			return (
				<SubscriptionDetailModal
					onClose={ this.closeDetailsModal }
					renewalUrl={ url }
					modalOpen={ open }
				/>
			);
		}
		return null;
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

		const needsAttentionSubscriptions = <Subscriptions
			{ ...this.props }
			subscriptions={ this.props.needsAttentionSubscriptions }
			needsAttention={ true }
			showDetailsModal={ this.showDetailsModal }
		/>;

		const groupedSubscriptions = <Subscriptions
			{ ...this.props }
			subscriptions={ this.props.groupedSubscriptions }
			isGrouped={ true }
		/>;

		const individualSubscriptions = <Subscriptions
			{ ...this.props }
			subscriptions={ this.props.individualSubscriptions }
		/>;

		const props = this.props;
		const hasGroupedSubscriptions = ! isEmpty( props.groupedSubscriptions );
		const hasIndividualSubscriptions = ! isEmpty( props.individualSubscriptions );
		const hasAttentionSubscriptions = ! isEmpty( props.needsAttentionSubscriptions );

		if ( hasGroupedSubscriptions || hasIndividualSubscriptions || needsAttentionSubscriptions ) {
			return (
				<div>
					{ this.modal( this.state.modalOpen, this.state.url ) }
					{ this.getSearch() }
					{ hasAttentionSubscriptions ? needsAttentionSubscriptions : null }
					{ hasGroupedSubscriptions ? groupedSubscriptions : null }
					{ hasIndividualSubscriptions ? individualSubscriptions : null }
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
	query: null,
};

export default injectIntl( SubscriptionsPage );