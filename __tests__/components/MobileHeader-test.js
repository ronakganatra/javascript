import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MobileHeader from '../../src/components/MobileHeader';
import { LogoutHeaderButton } from "../../src/components/Button";
import { Logo } from "../../src/components/Logo";
import logout from "../../src/icons/logout.svg";
import { MemoryRouter } from "react-router-dom";

test('the responsive site header matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<MobileHeader role="banner" onLogoutClick={ () => {} }>
					<Logo size="88px"/>
					<LogoutHeaderButton type="button" onClick={ () => {
						}
					} iconSource={ logout } iconSize="24px">
						Sign out</LogoutHeaderButton>
			</MobileHeader>
		</MemoryRouter>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
