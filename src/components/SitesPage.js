import util from "util";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { speak } from "@wordpress/a11y";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import Sites from "./Sites";
import Search from "./Search";
import NoResults from "./NoResults";
import { LargeIconButton, makeButtonFullWidth } from "./Button";
import plus from "../icons/plus.svg";
import AnimatedLoader from "./Loader";
import _debounce from "lodash/debounce";
import noSitesImage from "./../images/noSites.svg";
import sitesNoResultsImage from "./../images/SitesNoResults.svg";
import AddSite from "./AddSite";
import MyYoastModal from "./MyYoastModal";
import ConfigurationRequestForm from "./sites/ConfigurationRequestForm";
import { CONFIGURATION_SERVICE_FEATURE, hasAccessToFeature } from "../functions/features";

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


let debouncedSpeak = _debounce( speak, 1000 );

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

	getConfigurationRequest() {
		if ( hasAccessToFeature( CONFIGURATION_SERVICE_FEATURE ) ) {
			return <ConfigurationRequestForm sites={this.props.sites}
											 onConfigurationRequestClick={this.props.onConfigurationRequestClick}/>;
		}
		return null;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		speak( message );
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
			let message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.sites.length );
			debouncedSpeak( message, "assertive" );
		}
	}

	getModal() {
		let modalAriaLabel = defineMessages( {
			id: "modal.arialabel.add",
			defaultMessage: "Add a new site",
		} );
		return(
			<MyYoastModal
				isOpen={ this.props.modalOpen }
				onClose={ this.props.onClose }
				modalAriaLabel={ modalAriaLabel }
			>
				<AddSite
					onConnectClick={ this.props.onConnect }
					onCancelClick={ this.props.onClose }
					onChange={ this.props.onChange }
					errorFound={ this.props.errorFound }
					error={ this.props.error }
					query={ this.props.query }
					linkingSiteUrl={ this.props.linkingSiteUrl }
				/>
			</MyYoastModal>
		);
	}

	render() {
		let props = this.props;
		let noSitesParagraphs = [
			<FormattedMessage id="sites.noSite.welcome" defaultMessage="Welcome to the sites overview." />,
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

		if ( props.sites.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
						<ResponsiveIconButton onClick={ props.addSite } iconSource={ plus } aria-label={ messages.addSite.defaultMessage }>
							<FormattedMessage id={ messages.addSite.id } defaultMessage={ messages.addSite.defaultMessage } />
						</ResponsiveIconButton>
					</SiteAddContainer>
					{ this.getConfigurationRequest() }
					<Sites sites={ props.sites } plugins={ props.plugins } onManage={ props.onManage }/>
					{ this.getModal() }
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
					</SiteAddContainer>
					<NoResults onClick={ props.addSite } query={ props.query } paragraphs={ sitesNoResultsParagraphs } imageSource={ sitesNoResultsImage } pageContext="noSites"/>
					{ this.getModal() }
				</div>
			);
		}

		return (
			<div>
				<NoResults paragraphs={ noSitesParagraphs } onClick={ props.addSite } imageSource={ noSitesImage } pageContext="noSites" />
				{ this.getModal() }
			</div>
		);
	}
}

SitesPage.propTypes = {
	linkingSiteUrl: PropTypes.string.isRequired,
	addSite: PropTypes.func.isRequired,
	onSearchChange: PropTypes.func.isRequired,
	modalOpen: PropTypes.bool,
	onConnect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onManage: PropTypes.func.isRequired,
	errorFound: PropTypes.bool.isRequired,
	error: PropTypes.object,
	sites: PropTypes.arrayOf( PropTypes.object ),
	plugins: PropTypes.arrayOf( PropTypes.object ),
	intl: intlShape.isRequired,
	query: PropTypes.string,
	showLoader: PropTypes.bool,
	onConfigurationRequestClick: PropTypes.func,
};

SitesPage.defaultProps = {
	sites: [],
	linkingSiteUrl: "",
	modalOpen: false,
	error: null,
	showLoader: false,
};

export default injectIntl( SitesPage );
