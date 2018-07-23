import React from 'react';
import LoginMessage from "../../../src/components/login/LoginMessage";
import { defineMessages } from "react-intl";
import { createComponentWithIntl } from "../../../utils";

const messages = defineMessages( {
	header: {
		id: "login.header",
		defaultMessage: "Welcome back!",
	},
	message: {
		id: "login.message",
		defaultMessage: "Log in with your email address and password. If you don't remember your password, just reset it!",
	},
	headerReset: {
		id: "login.headerReset",
		defaultMessage: "Password changed successfully!",
	},
	button: {
		id: "login.button",
		defaultMessage: "Continue to MyYoast",
	},
} );

test( 'The LoginMessage component, with a paragraph, matches the snapshot', () => {
	const component = createComponentWithIntl(
		<LoginMessage header={ messages.header } message={ messages.message } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The LoginMessage component, with a button, matches the snapshot', () => {
	const component = createComponentWithIntl(
		<LoginMessage header={ messages.headerReset } message={ messages.button }
		              buttonLinkTo="https://example.com" />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
