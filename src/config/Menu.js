import React from "react";
import SitesPage from "../components/SitesPage";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import subscriptionsIcon from "../icons/subscriptions.svg";
import sitesIcon from "../icons/sites.svg";
import userIcon from "../icons/user.svg";

const messages = defineMessages( {
	subscriptionsPageLoaded: {
		id: "menu.subscriptions.loaded",
		defaultMessage: "Subscriptions page loaded",
	},
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	accountPageLoaded: {
		id: "menu.account.loaded",
		defaultMessage: "Account page loaded",
	},
} );

let Subscriptions = React.createClass( {
	render: function() {
		return ( <h1>Your subscriptions</h1> );
	},
	componentDidMount: function() {
		let message = this.props.intl.formatMessage( messages.subscriptionsPageLoaded );
		a11ySpeak( message );
	},
	propTypes: {
		intl: intlShape.isRequired,
	},
} );

let Sites = React.createClass( {
	render: function() {
		return ( <SitesPage sites={ [] } addSite={ () => {} } changeSearchQuery={ () => {} } /> );
	},
	componentDidMount: function() {
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	},
	propTypes: {
		intl: intlShape.isRequired,
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

Subscriptions = injectIntl( Subscriptions );
Sites = injectIntl( Sites );
Account = injectIntl( Account );

let menuItems = [
	{
		path: "/sites",
		titleKey: "sites",
		icon: sitesIcon,
		component: Sites,
		isActive: ( match, location ) => {
			if ( match ) {
				return true;
			}

			return location.pathname === "/";
		},
	},
	{
		path: "/subscriptions",
		titleKey: "subscriptions",
		icon: subscriptionsIcon,
		component: Subscriptions,
	},
	{
		path: "/account",
		titleKey: "account",
		icon: userIcon,
		component: Account,
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


export { Sites, NavigationItems };
export default menuItems;
