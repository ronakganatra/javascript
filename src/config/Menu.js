import React from "react";
import NoSites from "../components/NoSites";
import a11ySpeak from "a11y-speak";

const Subscriptions = React.createClass( {
	render: function() {
		return ( <h1>Your subscriptions</h1> );
	},
	componentDidMount: function() {
		a11ySpeak( "Subscriptions page loaded" );
	},
} );

const Sites = React.createClass( {
	render: function() {
		return ( <NoSites onClick={() => {}} /> );
	},
	componentDidMount: function() {
		a11ySpeak( "Sites page loaded" );
	},
} );

const Courses = React.createClass( {
	render: function() {
		return ( <h1>Your courses</h1> );
	},
	componentDidMount: function() {
		a11ySpeak( "Courses page loaded" );
	},
} );

const Account = React.createClass( {
	render: function() {
		return ( <h1>Your account details</h1> );
	},
	componentDidMount: function() {
		a11ySpeak( "Account details page loaded" );
	},
} );

let menuItems = [
	{ path: "/subscriptions", title: "Subscriptions", component: Subscriptions },
	{ path: "/sites", title: "Sites", component: Sites },
	{ path: "/courses", title: "Courses", component: Courses },
	{ path: "/account", title: "Account", component: Account },
];

export default menuItems;
