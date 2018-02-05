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

const messages = defineMessages( {
	sitePageLoaded: {
		id: "menu.site.loaded",
		defaultMessage: "Manage site page loaded",
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
		let message = this.props.intl.formatMessage( messages.sitePageLoaded );
		speak( message );
	}

	getModal() {
		let storeUrl = this.props.addSubscriptionModal.storeUrl || "";
		let open = this.props.addSubscriptionModal.modalOpen;

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

	render() {
		let props = this.props;

		if ( props.loadingSite ) {
			return <AnimatedLoader />;
		}

		let subscriptionList = <AnimatedLoader />;
		let hostnameDisplay = props.site.hostname.replace( /^(?:www\.)?/, "" );
		let siteNameDisplay = props.site.path === "/" ? hostnameDisplay : hostnameDisplay + props.site.path;

		if ( ! props.loadingSubscriptions ) {
			subscriptionList = <SiteSubscriptionDetailList
			    plugins={ props.plugins }
				onMoreInfoClick={ props.onMoreInfoClick }
				onToggleSubscription={ props.onToggleSubscription }
				onClose={ props.onClose }
				onToggleDisabled={ props.onToggleDisabled }
			/>;
		}
		return (
			<div>
				<SiteHeader name={ siteNameDisplay } url={ props.site.url } imageUrl={ props.site.header }/>
				{ subscriptionList }
				<SiteDangerZone onRemove={ props.onRemove } removing={ props.uiSite.removing } />
				{ this.getModal() }
			</div>
		);
	}
}

export default injectIntl( SitePage );

SitePage.propTypes = {
	site: PropTypes.object,
	uiSite: PropTypes.object,
	subscriptions: PropTypes.arrayOf( PropTypes.object ),
	plugins: PropTypes.arrayOf( PropTypes.object ),
	onMoreInfoClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onToggleSubscription: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	loadingSite: PropTypes.bool,
	loadingSubscriptions: PropTypes.bool,
	addSubscriptionModal: PropTypes.object,
};

SitePage.defaultProps = {
	subscriptions: [],
	loadingSite: false,
	loadingSubscriptions: true,
};
