import React from 'react';
import NewTabMessage from '../../src/components/NewTabMessage';
import { createComponentWithIntl } from "../../utils";

test('the new tab message component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<NewTabMessage />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
