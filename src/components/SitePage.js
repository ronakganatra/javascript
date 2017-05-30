import React from "react";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import SiteHeader from "./SiteHeader";
import SiteSubscriptionDetailList from "./SiteSubscriptionDetailList";
import SiteDangerZone from "./SiteDangerZone";
import AnimatedLoader from "./Loader";
import AddLicensesModal from "./AddLicensesModal";

import _filter from "lodash/filter";

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
		a11ySpeak( message );
	}

	getModal() {
		let productId = this.props.addSubscriptionModal.id;

		// Find the plugin with the correct productId.
		let plugins = _filter( this.props.plugins, plugin => plugin.id === productId );

		if ( plugins.length !== 1 ) {
			return;
		}

		return <AddLicensesModal isOpen={ productId !== null } onShop={ plugins[ 0 ].storeUrl } onClose={ this.props.onClose }/>;
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
			subscriptionList = <SiteSubscriptionDetailList siteSubscriptions={ props.subscriptions }
														   plugins={ props.plugins }
														   onAddMoreLicensesClick={ props.onAddMoreLicensesClick }
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
	site: React.PropTypes.object.isRequired,
	uiSite: React.PropTypes.object,
	subscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),
	plugins: React.PropTypes.arrayOf( React.PropTypes.object ),
	onAddMoreLicensesClick: React.PropTypes.func.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired,
	onToggleSubscription: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	loadingSite: React.PropTypes.bool,
	loadingSubscriptions: React.PropTypes.bool,
	addSubscriptionModal: React.PropTypes.object,
};

SitePage.defaultProps = {
	subscriptions: [],
	loadingSite: false,
	loadingSubscriptions: true,
};
