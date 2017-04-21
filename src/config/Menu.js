import React from "react";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import sitesIcon from "../icons/sites.svg";
import userIcon from "../icons/user.svg";
import SitesPageContainer from "../containers/SitesPage";
import SubscriptionsPageContainer from "../containers/SubscriptionsPage";
import OrdersPageContainer from "../containers/OrdersPage";

const messages = defineMessages( {
	subscriptionsPageLoaded: {
		id: "menu.subscriptions.loaded",
		defaultMessage: "Subscriptions page loaded",
	},
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	orderPageLoaded: {
		id: "menu.orders.loaded",
		defaultMessage: "Orders page loaded",
	},
	accountPageLoaded: {
		id: "menu.account.loaded",
		defaultMessage: "Account page loaded",
	},
} );

let Account = React.createClass( {
	render: function() {
		return ( <h1>Your account details</h1> );
	},
	componentDidMount: function() {
		let message = this.props.intl.formatMessage( messages.accountPageLoaded );
		a11ySpeak( message );
	},
	propTypes: {
		intl: intlShape.isRequired,
	},
} );

Account = injectIntl( Account );

let menuItems = [
	{
		showInMenu: true,
		path: "/sites",
		titleKey: "sites",
		icon: sitesIcon,
		component: SitesPageContainer,
		isActive: ( match, location ) => {
			if ( match ) {
				return true;
			}

			return location.pathname === "/";
		},
	},
	{
		showInMenu: true,
		path: "/account",
		titleKey: "account",
		icon: userIcon,
		component: Account,
	},
	{
		showInMenu: false,
		path: "/account/orders",
		component: OrdersPageContainer,
	},
	{
		showInMenu: false,
		path: "/account/subscriptions",
		component: SubscriptionsPageContainer,
	},
];

let Plugins = React.createClass( {
	render: function() {
		return ( <h1>Your plugins</h1> );
	},
} );

let Services = React.createClass( {
	render: function() {
		return ( <h1>Your services</h1> );
	},
} );

let NavigationItems = [
	{
		path: "/subscriptions/plugins",
		title: "Plugins",
		component: Plugins,
		isActive: ( match, location ) => {
			if ( match ) {
				return true;
			}

			return location.pathname === "/subscriptions/plugins";
		},
	},
	{
		path: "/subscriptions/services",
		title: "Services",
		component: Services,
	},
];

export { NavigationItems };

export default menuItems;
