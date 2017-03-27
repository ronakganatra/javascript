import React from 'react';
import renderer from 'react-test-renderer';

import Subscriptions from '../../src/components/Subscriptions';

test('the subscription component matches the snapshot', () => {
	const component = renderer.create(
		<Subscriptions activeSubscriptions={ [ "woo", "video" ] } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the subscription component without active subscriptions using the default matches the snapshot', () => {
	const component = renderer.create(
		<Subscriptions />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});