import React from 'react';
import renderer from 'react-test-renderer';
import SubscriptionHeader from "../../../../src/components/account/subscriptions/SubscriptionHeader";
import { MemoryRouter } from 'react-router-dom';
import { createComponentWithIntl } from "../../../../utils";

test('the subscription header matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SubscriptionHeader name="Subscription" />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
