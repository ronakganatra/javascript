import util from "util";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import AddSiteModal from "./AddSiteModal";
import Sites from "./Sites";
import Search from "./Search";
import NoResults from "./NoResults";
import { LargeIconButton, makeButtonFullWidth } from "./Button";
import plus from "../icons/plus.svg";
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
		id: "sitesSearch.results",
		defaultMessage: "Number of sites found: %d",
	},
	searchLabel: {
		id: "search.label.sites",
		defaultMessage: "Search sites",
	},
	addSite: {
		id: "sites.addSiteButton",
		defaultMessage: "Add site",
	},
} );

const SiteAddContainer = styled.div`
	text-align: center;
	button {
		margin: 20px 0 36px 0;
	}
`;

let ResponsiveIconButton = makeButtonFullWidth( LargeIconButton );


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
	 * Sends the number of sites found in the search results to the screenreader.
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
	render() {
		let props = this.props;
		let noSitesParagraphs = [
			<FormattedMessage id="sites.noSite.welcome" defaultMessage="Welcome to the sites overview" />,
			<FormattedMessage id="sites.noSite.manage"
							  defaultMessage="Here you will be able to manage all your sites that are running Yoast subscriptions." />,
			<FormattedMessage id="sites.noSite.pressButton" defaultMessage="Press the button below to add your first site."/>,
		];

		let sitesNoResultsParagraphs = [ <FormattedMessage id="sites.sitesNoResult.notfound"
							defaultMessage={ "We could not find { site } in your account." }
							values={ { site: <strong>{ props.query }</strong> } } />,
			<FormattedMessage id="sites.sitesNoResult.add" defaultMessage="Do you want to add it?" />,
		];

		if ( props.showLoader ) {
			return <AnimatedLoader />;
		}

		let modal = (
			<AddSiteModal isOpen={ props.popupOpen } onConnect={ props.onConnect } onClose={ props.onClose }
						  onChange={ props.onChange } errorFound={ props.errorFound }
						  errorMessage={ props.errorMessage } query={ props.query } linkingSiteUrl={ props.linkingSiteUrl } />
		);

		if ( props.sites.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
						<ResponsiveIconButton onClick={ props.addSite } iconSource={ plus } aria-label={ messages.addSite.defaultMessage }>
							<FormattedMessage id={ messages.addSite.id } defaultMessage={ messages.addSite.defaultMessage } />
						</ResponsiveIconButton>
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
					<NoResults onClick={ props.addSite } query={ props.query } paragraphs={ sitesNoResultsParagraphs } imageSource={ sitesNoResultsImage } pageContext="noSites"/>
					{ modal }
				</div>
			);
		}

		return (
			<div>
				<NoResults paragraphs={ noSitesParagraphs } onClick={ props.addSite } imageSource={ noSitesImage } pageContext="noSites" />
				{ modal }
			</div>
		);
	}
}

SitesPage.propTypes = {
	linkingSiteUrl: PropTypes.string.isRequired,
	addSite: PropTypes.func.isRequired,
	onSearchChange: PropTypes.func.isRequired,
	popupOpen: PropTypes.bool,
	onConnect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onManage: PropTypes.func.isRequired,
	errorFound: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
	sites: PropTypes.arrayOf( PropTypes.object ),
	plugins: PropTypes.arrayOf( PropTypes.object ),
	intl: intlShape.isRequired,
	query: PropTypes.string,
	showLoader: PropTypes.bool,
};

SitesPage.defaultProps = {
	sites: [],
	linkingSiteUrl: "",
	popupOpen: false,
	errorMessage: "",
	showLoader: false,
};

export default injectIntl( SitesPage );
