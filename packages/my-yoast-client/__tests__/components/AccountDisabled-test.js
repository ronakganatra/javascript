import React from 'react';
import AccountDisabled from '../../src/components/AccountDisabled';
import { createComponentWithIntl } from "../../utils";

test('the account disabled component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<AccountDisabled />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
