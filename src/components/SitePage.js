import PropTypes from "prop-types";
import React from "react";
import { speak } from "@wordpress/a11y";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import SiteHeader from "./SiteHeader";
import SiteSubscriptionDetailList from "./SiteSubscriptionDetailList";
import SiteDangerZone from "./SiteDangerZone";
import AnimatedLoader from "./Loader";
import AddLicenses from "./AddLicenses";
import MyYoastModal from "./MyYoastModal";
import PlatformSelect from "./sites/details/PlatformSelect";
import ConfigurationServiceRequestIntakeBlock from "./sites/ConfigurationServiceRequestIntakeBlock";
import ConfigurationServiceRequestStatusBlock from "./sites/ConfigurationServiceRequestStatusBlock";
import ConfigurationServiceRequestForm from "./sites/configuration-service-requests/ConfigurationServiceRequestForm";
import { hasAccessToFeature, CONFIGURATION_SERVICE_FEATURE } from "../functions/features";
import DownloadsModalContainer from "./modal/DownloadModal";

const messages = defineMessages( {
	sitePageLoaded: {
		id: "menu.site.loaded",
		defaultMessage: "Manage site page loaded",
	},
	changeSitePlatform: {
		id: "site.details.platform-select-header",
		defaultMessage: "Select the platform your site is running on",
	},
} );

/**
 * Returns the rendered Site Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 */
class SitePage extends React.Component {
	componentDidMount() {
		// Announce navigation to assistive technologies.
		const message = this.props.intl.formatMessage( messages.sitePageLoaded );
		speak( message );
	}

	/**
	 * Returns the MyYoastModal.
	 *
	 * @returns {ReactElement} The MyYoastModal modal
	 */
	getModal() {
		const storeUrl = this.props.addSubscriptionModal.storeUrl || "";
		const open = this.props.addSubscriptionModal.modalOpen;

		const messages = defineMessages( {
			modalAriaLabel: {
				id: "modal.arialabel.add",
				defaultMessage: "Add licenses",
			},
		} );

		return (
			<MyYoastModal
				isOpen={ open }
				onClose={ this.props.onClose }
				modalAriaLabel={ messages.modalAriaLabel }
			>
				<AddLicenses
					onClose={ this.props.onClose }
					onShop={ storeUrl }
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
		if ( ! hasAccessToFeature( CONFIGURATION_SERVICE_FEATURE ) ) {
			return null;
		}

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
					configurationServiceRequestModalSiteId={ this.props.site.id }
					configurationServiceRequest={ this.props.availableConfigurationServiceRequests[ 0 ] }
					configureConfigurationServiceRequest={ this.props.configureConfigurationServiceRequest }
				/>
			</MyYoastModal>
		);
	}

	getConfigurationServiceRequestBlock() {
		if ( ! hasAccessToFeature( CONFIGURATION_SERVICE_FEATURE ) ) {
			return null;
		}

		if ( this.props.site.configurationServiceRequest ) {
			return <ConfigurationServiceRequestStatusBlock
				id={ this.props.site.configurationServiceRequest.id }
				status={ this.props.site.configurationServiceRequest.status }
			/>;
		}

		if (	this.props.availableConfigurationServiceRequests.length > 0 ) {
			return <ConfigurationServiceRequestIntakeBlock
				amountAvailable={ this.props.availableConfigurationServiceRequests.length }
				siteId={ this.props.site.id }
				openConfigurationServiceRequestModal={ this.props.openConfigurationServiceRequestModal }
			/>;
		}

		return null;
	}

	getSubscriptionsList() {
		if ( this.props.loadingSubscriptions ) {
			return <AnimatedLoader />;
		}

		return <SiteSubscriptionDetailList
			plugins={ this.props.plugins }
			onMoreInfoClick={ this.props.onMoreInfoClick }
			onToggleSubscription={ this.props.onToggleSubscription }
			onClose={ this.props.onClose }
			onToggleDisabled={ this.props.onToggleDisabled }
			onDownloadModalOpen={ this.props.onDownloadModalOpen }
		/>;
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const props = this.props;

		if ( props.loadingSite ) {
			return <AnimatedLoader />;
		}

		const hostnameDisplay  = props.site.hostname.replace( /^(?:www\.)?/, "" );
		const siteNameDisplay  = props.site.path === "/" ? hostnameDisplay : hostnameDisplay + props.site.path;

		return (
			<div>
				<SiteHeader name={ siteNameDisplay } url={ props.site.url } imageUrl={ props.site.header } adminButton={ props.site.type === "wordpress" } />
				{ this.getSubscriptionsList() }
				{ this.getConfigurationServiceRequestBlock() }
				<PlatformSelect
					title={ props.intl.formatMessage( messages.changeSitePlatform ) }
					siteId={ props.site.id }
					siteType={ props.site.type }
					onConfirm={ props.onConfirmPlatformChange }
					disablePlatformSelect={ props.disablePlatformSelect }
				/>
				{ this.getConfigurationServiceRequestModal() }
				<SiteDangerZone onRemove={ props.onRemove } removing={ props.uiSite.removing } />
				{ this.getModal() }
				<DownloadsModalContainer />
			</div>
		);
	}
}

export default injectIntl( SitePage );

SitePage.propTypes = {
	availableConfigurationServiceRequests: PropTypes.arrayOf( PropTypes.object ),
	site: PropTypes.object,
	uiSite: PropTypes.object,
	subscriptions: PropTypes.arrayOf( PropTypes.object ),
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onMoreInfoClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	onToggleDisabled: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	loadingSite: PropTypes.bool,
	loadingSubscriptions: PropTypes.bool,
	addSubscriptionModal: PropTypes.object,
	onConfirmPlatformChange: PropTypes.func,
	disablePlatformSelect: PropTypes.bool,

	configurationServiceRequestModalOpen: PropTypes.bool,
	configurationServiceRequestModalSiteId: PropTypes.string,
	onConfigurationModalClose: PropTypes.func.isRequired,
	configureConfigurationServiceRequest: PropTypes.func.isRequired,
	openConfigurationServiceRequestModal: PropTypes.func.isRequired,
	onDownloadModalOpen: PropTypes.func,
};

SitePage.defaultProps = {
	subscriptions: [],
	loadingSite: false,
	loadingSubscriptions: true,
	onDownloadModalOpen: () => {},
};
