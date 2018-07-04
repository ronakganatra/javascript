import React from 'react';
import UploadUserImage from "../../../../src/components/account/profile/UploadUserImage";
import { createComponentWithIntl } from "../../../../utils";

test( 'The UploadUserImage component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<UploadUserImage />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );