import React from 'react';
import renderer from 'react-test-renderer';
import SubscriptionHeader from "../../src/components/SubscriptionHeader";

test('the subscription header matches the snapshot', () => {
	const component = renderer.create(
		<SubscriptionHeader name="Subscription" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
