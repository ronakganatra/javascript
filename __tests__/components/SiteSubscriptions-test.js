import React from 'react';
import renderer from 'react-test-renderer';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptions from '../../src/components/SiteSubscriptions';

let plugins = [
	{
		id: "0001",
		icon: "test.jpg",
		name: "Test",
	},
	{
		id: "0002",
		icon: "test.jpg",
		name: "Test2",
	},
	{
		id: "0003",
		icon: "test.jpg",
		name: "Test3",
	},
	{
		id: "0004",
		icon: "test.jpg",
		name: "Test4",
	}
];

let activeSubscriptions = [
	{
		productId: "0001",
	},
	{
		productId: "0002",
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
