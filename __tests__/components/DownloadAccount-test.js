import React from 'react';
import { createComponentWithIntl } from "../../utils";

import DownloadAccount from "../../src/components/account/profile/dangerzone/DownloadAccount";

test('The download account component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<DownloadAccount/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
