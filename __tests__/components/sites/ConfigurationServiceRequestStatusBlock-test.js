import React from 'react';
import ConfigurationServiceRequestStatusBlock from '../../../src/components/sites/ConfigurationServiceRequestStatusBlock';
import { createComponentWithIntl } from "../../../utils";

test('the configuration service request status block component with status submitted matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ConfigurationServiceRequestStatusBlock status="submitted" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the configuration service request status block component with status in progress matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ConfigurationServiceRequestStatusBlock status="in progress" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the configuration service request status block component with status completed matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ConfigurationServiceRequestStatusBlock status="completed" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
