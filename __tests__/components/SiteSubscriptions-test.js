import React from 'react';
import renderer from 'react-test-renderer';

import SiteSubscriptions from '../../src/components/SiteSubscriptions';

test('the subscription component matches the snapshot', () => {
	const component = renderer.create(
		<SiteSubscriptions activeSubscriptions={ [ "woo", "video" ] } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the subscription component without active subscriptions using the default matches the snapshot', () => {
	const component = renderer.create(
		<SiteSubscriptions />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});