import React from 'react';
import renderer from 'react-test-renderer';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptions from '../../src/components/SiteSubscriptions';

let plugins = [
	{
		glNumber: 111,
		ids: [ "1" ],
		icon: "test.jpg",
		name: "Test",
	},
	{
		glNumber: 222,
		ids: [ "2" ],
		icon: "test.jpg",
		name: "Test2",
	},
	{
		glNumber: 333,
		ids: [ "3" ],
		icon: "test.jpg",
		name: "Test3",
	},
	{
		glNumber: 444,
		ids: [ "4" ],
		icon: "test.jpg",
		name: "Test4",
	}
];

let activeSubscriptions = [
	{
		product: {
			id: 1,
		},
		productId: "1",
	},
	{
		product: {
			id: 2,
		},
		productId: "2",
	},
];

test('the subscription component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptions plugins={ plugins } activeSubscriptions={ activeSubscriptions } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the subscription component without plugins with active subscriptions using the default matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptions activeSubscriptions={ activeSubscriptions } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the subscription component with plugins without active subscriptions using the default matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptions plugins={ plugins } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the subscription component without plugins or active subscriptions using the default matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptions />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
