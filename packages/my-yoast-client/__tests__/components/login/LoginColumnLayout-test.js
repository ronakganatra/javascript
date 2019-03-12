import React from 'react';
import LoginMessage from "../../../src/components/login/LoginMessage";
import { defineMessages } from "react-intl";
import { createComponentWithIntl } from "../../../utils";
import LoginColumnLayout from "../../../src/components/login/LoginColumnLayout";

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

test('The LoginColumnLayout component, with two columns, matches the snapshot', () => {
	const component = createComponentWithIntl(
		<LoginColumnLayout>
			<LoginMessage header={ messages.header } message={ messages.message }/>
			<LoginMessage header={ messages.headerReset } message={ messages.button } buttonLinkTo="https://example.com"/>
		</LoginColumnLayout>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('The LoginColumnLayout component, with one column, matches the snapshot', () => {
	const component = createComponentWithIntl(
		<LoginColumnLayout>
			<LoginMessage header={ messages.header } message={ messages.message }/>
		</LoginColumnLayout>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
