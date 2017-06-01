import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MobileHeader from '../../src/components/MobileHeader';
import { LogoutButtonResponsive } from "../../src/components/Button";
import { Logo } from "../../src/components/Logo";
import logout from "../../src/icons/logout.svg";
import { MemoryRouter } from "react-router-dom";

test('the responsive site header matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<MobileHeader role="banner">
					<Logo size="88px"/>
					<LogoutButtonResponsive type="button" onClick={ () => {
						}
					} iconSource={ logout } iconSize="24px">
						Sign out</LogoutButtonResponsive>
			</MobileHeader>
		</MemoryRouter>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
