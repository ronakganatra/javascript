import React from 'react';
import { createComponentWithIntl } from "../../utils";

import ErrorMessage from '../../src/components/ErrorMessage';

test('the ErrorMessage component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ErrorMessage errorMessage="This is a test" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});