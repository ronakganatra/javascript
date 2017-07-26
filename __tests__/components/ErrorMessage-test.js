import React from 'react';
import { createComponentWithIntl } from "../../utils";

import ErrorMessage from '../../src/components/MessageBoxes';

test('the ErrorMessage component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorMessage errorMessage="This is a test" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the ErrorMessage component with an implemented placeholder matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorMessage errorMessage="This is a test [customer_support_link]" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the ErrorMessage with no Icon requested matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorMessage errorMessage="This is a test [customer_support_link]" showIcon={ false } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});