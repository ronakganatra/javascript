import React from 'react';
import renderer from 'react-test-renderer';
import SubscriptionHeader from "../../src/components/SubscriptionHeader";
import { MemoryRouter } from 'react-router-dom';

test('the subscription header matches the snapshot', () => {
	const component = renderer.create(
		<MemoryRouter>
			<SubscriptionHeader name="Subscription" />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
