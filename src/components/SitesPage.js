import util from "util";
import React from "react";
import styled from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import AddSiteModal from "./AddSiteModal";
import Sites from "./Sites";
import Search from "./Search";
import NoResults from "./NoResults";
import { RoundAddButton } from "./RoundButton";
import AnimatedLoader from "./Loader";
import _debounce from "lodash/debounce";
import noSitesImage from "./../images/noSites.svg";
import sitesNoResultsImage from "./../images/SitesNoResults.svg";

const messages = defineMessages( {
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	searchResults: {
		id: "sites-search.results",
		defaultMessage: "Number of sites found: %d",
	},
	searchLabel: {
		id: "search.label.sites",
		defaultMessage: "Search sites",
	},
} );

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

let debouncedSpeak = _debounce( a11ySpeak, 1000 );

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
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;
		let noSitesParagraphs = [
			<FormattedMessage id="sites.no-site.welcome" defaultMessage="Welcome to the sites overview" />,
			<FormattedMessage id="sites.no-site.manage"
							  defaultMessage="Here you will be able to manage all your sites that are running Yoast subscriptions." />,
			<FormattedMessage id="sites.no-site.press-button" defaultMessage="Press the button below to add your first site."/>,
		];
		let sitesNoResultsParagraphs = [ <FormattedMessage id="sites.sites-no-result.notfound"
							defaultMessage={ "We could not find { site } in your account." }
							values={ { site: <strong>{ props.query }</strong> } } />,
			<FormattedMessage id="sites.sites-no-result.add" defaultMessage="Do you want to add it?" />,
		];

		if ( props.showLoader ) {
			return <AnimatedLoader />;
		}
		let modal = (
			<AddSiteModal isOpen={ props.popupOpen } onLink={ props.onLink } onClose={ props.onClose }
						  onChange={ props.onChange } errorFound={ props.errorFound }
						  errorMessage={ props.errorMessage } query={ props.query } linkingSiteUrl={ props.linkingSiteUrl } />
		);
		if ( props.sites.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
						<RoundAddButton onClick={ props.addSite }/>
					</SiteAddContainer>
					<Sites sites={ props.sites } plugins={ props.plugins } onManage={ props.onManage }/>
					{ modal }
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
					</SiteAddContainer>
					<NoResults onClick={ props.addSite } query={ props.query } paragraphs={ sitesNoResultsParagraphs } imageSource={ sitesNoResultsImage }/>
					{ modal }
				</div>
			);
		}
		return (
			<div>
				<NoResults paragraphs={ noSitesParagraphs } onClick={ props.addSite } imageSource={ noSitesImage }/>
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
		this.speakSearchResultsMessage( nextProps );
	}

	speakSearchResultsMessage( nextProps ) {
		if ( nextProps.query.length > 0 && ( this.props.query !== nextProps.query ) ) {
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.sites.length );
			debouncedSpeak( message, "assertive" );
		}
	}
}

SitesPage.propTypes = {
	linkingSiteUrl: React.PropTypes.string.isRequired,
	addSite: React.PropTypes.func.isRequired,
	onSearchChange: React.PropTypes.func.isRequired,
	popupOpen: React.PropTypes.bool,
	onLink: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	onManage: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	plugins: React.PropTypes.arrayOf( React.PropTypes.object ),
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
	showLoader: React.PropTypes.bool,
};

SitesPage.defaultProps = {
	sites: [],
	linkingSiteUrl: "",
	popupOpen: false,
	errorMessage: "",
	showLoader: false,
};

export default injectIntl( SitesPage );
