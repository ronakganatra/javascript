import util from "util";
import React from "react";
import styled, { keyframes } from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import AddSiteModal from "./AddSiteModal";
import Sites from "./Sites";
import Search from "./Search";
import NoSites from "./NoSites";
import SitesNoResult from "./SitesNoResult";
import { RoundAddButton } from "./RoundButton";
import Loader from "yoast-components/composites/basic/Loader";
import "yoast-components/composites/basic/loader.scss";

const messages = defineMessages( {
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
	searchResults: {
		id: "search.results",
		defaultMessage: "Number of sites found: %d",
	},
} );

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

const animation = keyframes`
	0%   { transform: scale( 0.70 ); opacity: 0.4; }
	80%  { opacity: 1 }
	100% { transform: scale( 0.95 ); opacity: 1 }
`;

let AnimatedLoader = styled( Loader )`
	animation: ${animation} 1.15s infinite;
	animation-direction: alternate;
	animation-timing-function: cubic-bezier(0.96, 0.02, 0.63, 0.86);
	width: 60px;
	height: 60px;
	margin: calc( 50% - 30px ) 0 0 calc( 50% - 30px );
`;

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
class SitesPage extends React.Component {
	/**
	 * Sets the SitesPage object.
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
	 * @returns {ReactElement} The rendered Sites component.
	 */
	getSearch() {
		let changeSearchQuery = ( event ) => {
			this.props.changeSearchQuery( event.target.value );
		};

		return <Search
			id="search"
			description={ this.props.intl.formatMessage( messages.description ) }
			descriptionId="searchDescription"
			onChange={ changeSearchQuery }
			query={ this.props.query }
		/>;
	}

	componentDidMount() {
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;
		if ( props.showLoader ) {
			return <AnimatedLoader />;
		}

		let modal = (
			<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose }
						  onChange={ props.onChange } errorFound={ props.errorFound }
						  errorMessage={ props.errorMessage } query={ props.query } />
		);
		if ( props.sites.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
						<RoundAddButton onClick={ props.addSite }/>
					</SiteAddContainer>
					<Sites sites={ props.sites } onManage={ props.onManage }/>
					{ modal }
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
					</SiteAddContainer>
					<SitesNoResult onClick={ props.addSite } query={ props.query } />
					{ modal }
				</div>
			);
		}
		return (
			<div>
				<NoSites onClick={ props.addSite }/>
				{ modal }
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
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.sites.length );

			/*
			 * Clear the a11ySpeak message so VoiceOver will detect a change in 1 second and always announce the messsage.
			 *
			 * There is a problem in VoiceOver in which it will not announce the text if it did not change since the last message.
			 * Clearing the message and instantly setting it again does not seem to solve the problem.
			 * Because we can make use of the 1 second de-bounce delay we have a bigger window to play with.
			 */
			a11ySpeak( "", "assertive" );
			this.searchTimer = window.setTimeout( function() {
				a11ySpeak( message, "assertive" );
			}, 1000 );
		}
	}
}

export default injectIntl( SitesPage );

SitesPage.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	addSite: React.PropTypes.func.isRequired,
	changeSearchQuery: React.PropTypes.func.isRequired,
	popupOpen: React.PropTypes.bool,
	onLink: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	onManage: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
	showLoader: React.PropTypes.bool,
};

SitesPage.defaultProps = {
	sites: [],
	popupOpen: false,
	errorMessage: "",
	showLoader: false,
};
