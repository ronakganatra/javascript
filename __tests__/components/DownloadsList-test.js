import React from 'react';
import { createComponentWithIntl } from "../../utils";

import DownloadsList from '../../src/components/AddSite';

test('The AddSite component matches the snapshot', () => {
	const downloads = [
		{
			name: "product1",
			file: "https://yoast.com/app/uploads/2017/10/wpseo-woocommerce-5.6.zip",
		},
		{
			name: "product2",
			file: "https://yoast.com/app/uploads/2017/10/wpseo-woocommerce-5.6.zip",
		},
	];

	const component = createComponentWithIntl(
		<DownloadsList
			onDownloadModalClose={ () => {} }
			downloads={ downloads }
		/>

	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
