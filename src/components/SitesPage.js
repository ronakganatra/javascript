import util from "util";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { speak } from "@wordpress/a11y";
import { defineMessages, injectIntl, intlShape, FormattedMessage } from "react-intl";
import Sites from "./Sites";
import Search from "./Search";
import NoResults from "./NoResults";
import { AddSiteIconButton } from "./Buttons";
import AnimatedLoader from "./Loader";
import _debounce from "lodash/debounce";
import noSitesImage from "./../images/noSites.svg";
import sitesNoResultsImage from "./../images/SitesNoResults.svg";
import MyYoastModal from "./MyYoastModal";
import ConfigurationServiceRequestBlock from "./sites/ConfigurationServiceRequestBlock";
import { CONFIGURATION_SERVICE_FEATURE, hasAccessToFeature } from "../functions/features";
import ConfigurationServiceRequestForm from "./sites/configuration-service-requests/ConfigurationServiceRequestForm";
import AddSiteModal from "./modal/AddSiteModal";

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
`;

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
	 * Returns the search bar.
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

	/**
	 * Returns the Configuration Service block.
	 *
	 * @returns {ReactElement} The rendered Search component.
	 */
	getConfigurationServiceRequest() {
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

	/**
	 * Announces navigation to assistive technologies when the component mounts.
	 *
	 * @returns {void}
	 */
	componentDidMount() {
		const message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		speak( message );
	}

	/**
	 * Announces the search results to assistive technologies when the component receives new props.
	 *
	 * @param {Object} nextProps The new props the component will receive.
	 *
	 * @returns {void}
	 */
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

	/**
	 * Announces the search results to assistive technologies.
	 *
	 * @param {Object} nextProps The new props the component has received.
	 *
	 * @returns {void}
	 */
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
			return <AddSiteModal { ...this.props } />;
		} else if ( this.props.configurationServiceRequestModalOpen ) {
			return this.getConfigurationServiceRequestModal();
		}
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

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
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

		const sitesNoResultsParagraphs = [
			<FormattedMessage
				id="sites.sitesNoResult.notfound"
				defaultMessage={ "We could not find { site } in your account." }
				values={ { site: <strong>{ props.query }</strong> } }
			/>,
			<FormattedMessage id="sites.sitesNoResult.add" defaultMessage="Do you want to add it?" />,
		];

		if ( props.showLoader ) {
			return <AnimatedLoader />;
		}

		const hasSites = props.sites.length > 0;
		const isSearch = props.query.length > 0;
		const showSearch = hasSites || isSearch;
		let paragraphs;
		let imageSource;

		if ( hasSites ) {
			paragraphs = null;
			imageSource = null;
		} else if ( isSearch ) {
			paragraphs = sitesNoResultsParagraphs;
			imageSource = sitesNoResultsImage;
		} else {
			paragraphs = noSitesParagraphs;
			imageSource = noSitesImage;
		}

		return (
			<div>
				<SiteAddContainer>
					{ showSearch && this.getSearch() }
				</SiteAddContainer>
				<NoResults
					query={ props.query }
					paragraphs={ paragraphs }
					imageSource={ imageSource }
				>
					<AddSiteIconButton onClick={ props.addSite } />
				</NoResults>
				{ hasSites && this.getConfigurationServiceRequest() }
				{ hasSites && <Sites sites={ props.sites } plugins={ props.plugins } onManage={ props.onManage } /> }
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
