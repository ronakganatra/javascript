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
import ConfigurationServiceRequestBlock from "./sites/ConfigurationServiceRequestBlock";
import { CONFIGURATION_SERVICE_FEATURE, hasAccessToFeature } from "../functions/features";
import ConfigurationServiceRequestForm from "./sites/configuration-service-requests/ConfigurationServiceRequestForm";

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

const ResponsiveIconButton = makeButtonFullWidth( LargeIconButton );


const debouncedSpeak = _debounce( speak, 1000 );

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

	getConfigurationServiceRequest( id, data ) {
		if ( this.props.availableConfigurationServiceRequests.length === 0 ) {
			return null;
		}

		if ( ! hasAccessToFeature( CONFIGURATION_SERVICE_FEATURE ) ) {
			return null;
		}

		if ( this.props.sites.length === 0 ) {
			return null;
		}
		return <ConfigurationServiceRequestBlock
			amountAvailable={ this.props.availableConfigurationServiceRequests.length }
			sites={ this.props.availableSites }
			openConfigurationServiceRequestModal={ this.props.openConfigurationServiceRequestModal }
		/>;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.sitesPageLoaded );
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
			const message = util.format( this.props.intl.formatMessage( messages.searchResults ), nextProps.sites.length );
			debouncedSpeak( message, "assertive" );
		}
	}

	/**
	 * Gets the related modal (AddSite or Configuration) to open.
	 *
	 * @returns {func} The getAddSiteModal() function to open the AddSite modal
	 * @returns {func} The getConfigurationServiceRequestModal() function to open the ConfigurationServiceRequestForm modal
	 */
	getModal() {
		if ( this.props.modalOpen ) {
			return this.getAddSiteModal();
		} else if ( this.props.configurationServiceRequestModalOpen ) {
			return this.getConfigurationServiceRequestModal();
		}
	}

	/**
	 * Gets the AddSite modal.
	 *
	 * @returns {object} The AddSite modal rendered and opened.
	 */
	getAddSiteModal() {
		const modalAriaLabel = defineMessages( {
			id: "modal.arialabel.add",
			defaultMessage: "Add a new site",
		} );
		return (
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

	/**
	 * Gets the ConfigurationServiceRequestForm modal.
	 *
	 * @returns {object} The ConfigurationServiceRequestForm modal rendered and opened.
	 */
	getConfigurationServiceRequestModal() {
		const modalAriaLabel = defineMessages( {
			id: "modal.arialabel.configuration-service",
			defaultMessage: "Request our configuration service",
		} );
		return (
			<MyYoastModal
				isOpen={ this.props.configurationServiceRequestModalOpen }
				onClose={ this.props.onConfigurationModalClose }
				modalAriaLabel={ modalAriaLabel }
			>
				<ConfigurationServiceRequestForm
					onClose={ this.props.onConfigurationModalClose }
					configurationServiceRequestModalSiteId={ this.props.configurationServiceRequestModalSiteId }
					configurationServiceRequest={ this.props.availableConfigurationServiceRequests[ 0 ] }
					configureConfigurationServiceRequest={ this.props.configureConfigurationServiceRequest }
				/>
			</MyYoastModal>
		);
	}

	render() {
		const props = this.props;
		const noSitesParagraphs = [
			<FormattedMessage id="sites.noSite.welcome" defaultMessage="Welcome to the sites overview." />,
			<FormattedMessage
				id="sites.noSite.manage"
				defaultMessage="Here you will be able to manage all your sites that are running Yoast subscriptions."
			/>,
			<FormattedMessage id="sites.noSite.pressButton" defaultMessage="Press the button below to add your first site." />,
		];

		const sitesNoResultsParagraphs = [ <FormattedMessage
			id="sites.sitesNoResult.notfound"
			defaultMessage={ "We could not find { site } in your account." }
			values={ { site: <strong>{ props.query }</strong> } }
		/>,
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
						<ResponsiveIconButton onClick={ props.addSite } iconSource={ plus }>
							<FormattedMessage id={ messages.addSite.id } defaultMessage={ messages.addSite.defaultMessage } />
						</ResponsiveIconButton>
					</SiteAddContainer>
					{ this.getConfigurationServiceRequest() }
					<Sites sites={ props.sites } plugins={ props.plugins } onManage={ props.onManage } />
					{ this.getModal() }
				</div>
			);
		} else if ( props.query.length > 0 ) {
			return (
				<div>
					<SiteAddContainer>
						{ this.getSearch() }
					</SiteAddContainer>
					<NoResults onClick={ props.addSite } query={ props.query } paragraphs={ sitesNoResultsParagraphs } imageSource={ sitesNoResultsImage } pageContext="noSites" />
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
	addSite: PropTypes.func.isRequired,
	onSearchChange: PropTypes.func.isRequired,
	onConnect: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onManage: PropTypes.func.isRequired,
	configureConfigurationServiceRequest: PropTypes.func.isRequired,
	onConfigurationModalClose: PropTypes.func.isRequired,
	openConfigurationServiceRequestModal: PropTypes.func.isRequired,

	errorFound: PropTypes.bool.isRequired,
	error: PropTypes.object,

	sites: PropTypes.arrayOf( PropTypes.object ),
	plugins: PropTypes.arrayOf( PropTypes.object ),
	configurationServiceRequests: PropTypes.arrayOf( PropTypes.object ),
	availableConfigurationServiceRequests: PropTypes.arrayOf( PropTypes.object ),
	availableSites: PropTypes.arrayOf( PropTypes.object ),

	linkingSiteUrl: PropTypes.string.isRequired,
	query: PropTypes.string,
	showLoader: PropTypes.bool,
	modalOpen: PropTypes.bool,
	configurationServiceRequestModalOpen: PropTypes.bool,
	configurationServiceRequestModalSiteId: PropTypes.string,

	intl: intlShape.isRequired,
};

SitesPage.defaultProps = {
	sites: [],
	availableConfigurationServiceRequests: [],
	availableSites: [],
	configurationServiceRequestModalSiteId: "",
	linkingSiteUrl: "",
	modalOpen: false,
	error: null,
	showLoader: false,
};

export default injectIntl( SitesPage );
