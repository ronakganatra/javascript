import React from 'react';
import { createComponentWithIntl } from "../../utils";
import Subscriptions, { subscriptions } from '../../src/components/Subscriptions';
import { MemoryRouter } from "react-router-dom";

test('The Subscriptions component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<Subscriptions subscriptions={ subscriptions } />
		</MemoryRouter>
			);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
