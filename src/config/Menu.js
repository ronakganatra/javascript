import React from "react";
import NoSites from "../components/NoSites";
import a11ySpeak from "a11y-speak";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import AddSiteModal from "../components/AddSiteModal";

const messages = defineMessages( {
	subscriptionsPageLoaded: {
		id: "menu.subscriptions.loaded",
		defaultMessage: "Subscriptions page loaded",
	},
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
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
	getInitialState: function() {
		return { openModal: false };
	},
	render: function() {
		return (
			<div>
				<NoSites onClick={ this.openAddSiteModal } />
				<AddSiteModal isOpen={ this.state } />
			</div>
		);
	},
	componentDidMount: function() {
		let message = this.props.intl.formatMessage( messages.sitesPageLoaded );
		a11ySpeak( message );
	},
	openAddSiteModal() {
		this.setState( { openModal: true } );
	},
	propTypes: {
		intl: intlShape.isRequired,
	},
} );

let Courses = React.createClass( {
	render: function() {
		return ( <h1>Your courses</h1> );
	},
	componentDidMount: function() {
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
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
Courses = injectIntl( Courses );
Account = injectIntl( Account );

let menuItems = [
	{ path: "/subscriptions", title: "Subscriptions", component: Subscriptions },
	{ path: "/sites", title: "Sites", component: Sites },
	{ path: "/courses", title: "Courses", component: Courses },
	{ path: "/account", title: "Account", component: Account },
];

export default menuItems;
