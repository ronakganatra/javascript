import React from 'react';
import { createComponentWithIntl } from "../../../utils";

import ResetPasswordPage from "../../../src/components/login/ResetPasswordPage";

test( 'The ResetPasswordPage component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<ResetPasswordPage
			location={ { search: "" } }
			attemptResetPassword={ () => {} }
			passwordResetSuccess={ false }
		/>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
