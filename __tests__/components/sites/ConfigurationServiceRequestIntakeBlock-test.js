import React from 'react';
import ConfigurationServiceRequestIntakeBlock from '../../../src/components/sites/ConfigurationServiceRequestIntakeBlock';
import { createComponentWithIntl } from "../../../utils";

test('the configuration service request intake block component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ConfigurationServiceRequestIntakeBlock amountAvailable={ 1 } siteId="test" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the configuration service request intake block component calls the supplied function', () => {
	const mockupFunction = jest.fn();

	const component = createComponentWithIntl(
		<ConfigurationServiceRequestIntakeBlock amountAvailable={ 1 } siteId="test" openConfigurationServiceRequestModal={ mockupFunction } />
	);

	let tree = component.toJSON();

	// call onClick function on the component.
	const onClick = tree.children[0].children[1].children[1].props.onClick;
	onClick();

	expect(mockupFunction).toHaveBeenCalled();
});

