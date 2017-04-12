import React from "react";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { Link } from "react-router-dom";

import SiteHeader from "./SiteHeader";
import { RoundBackButton } from "./RoundButton";
import SiteSubscriptionDetailList from "./SiteSubscriptionDetailList";
import AnimatedLoader from "./Loader";

const messages = defineMessages( {
	sitePageLoaded: {
		id: "menu.site.loaded",
		defaultMessage: "Site page loaded",
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
		let message = this.props.intl.formatMessage( messages.sitePageLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;

		if ( props.loadingSite ) {
			return <AnimatedLoader />;
		}

		let subscriptionList = <AnimatedLoader />;
		if ( ! props.loadingSubscriptions ) {
			subscriptionList = <SiteSubscriptionDetailList siteSubscriptions={ props.subscriptions }
														   onAddMoreSlotsClick={ props.onAddMoreSlotsClick }
														   onMoreInfoClick={ props.onMoreInfoClick }
														   onSettingsClick={ props.onSettingsClick }
														   onToggleSubscription={ props.onToggleSubscription }
			/>;
		}

		return (
			<div>
				<Link to={ "/sites" } >
					<RoundBackButton />
				</Link>
				<SiteHeader name={ props.site.url } url={ props.site.url } imageUrl={ props.siteImage }/>
				{ subscriptionList }
			</div>
		);
	}
}

export default injectIntl( SitePage );

SitePage.propTypes = {
	site: React.PropTypes.object.isRequired,
	subscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),
	siteImage: React.PropTypes.string.isRequired,
	onAddMoreSlotsClick: React.PropTypes.func.isRequired,
	onMoreInfoClick: React.PropTypes.func.isRequired,
	onSettingsClick: React.PropTypes.func.isRequired,
	onToggleSubscription: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	loadingSite: React.PropTypes.bool,
	loadingSubscriptions: React.PropTypes.bool,
};

SitePage.defaultProps = {
	subscriptions: [],
	loadingSite: false,
	loadingSubscriptions: true,
	site: {},
	siteImage: "http://google.com",
	onAddMoreSlotsClick: () => {},
	onMoreInfoClick: () => {},
	onSettingsClick: () => {},
	onToggleSubscription: () => {},
};
