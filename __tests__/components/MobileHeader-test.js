import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MobileHeader from '../../src/components/MobileHeader';
import { BeaconHeaderButton, LogoutHeaderButton } from "../../src/components/MobileHeader";
import { Logo } from "../../src/components/Logo";
import logout from "../../src/icons/logout.svg";
import questionCircle from "../../src/icons/question-circle.svg";
import { MemoryRouter } from "react-router-dom";

test('the responsive site header matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<MobileHeader role="banner" onLogoutClick={ () => {} } onBeaconClick={ () => {} }>
				<BeaconHeaderButton type="button" onClick={ () => {} } iconSource={ questionCircle } iconSize="24px">Need help?</BeaconHeaderButton>
				<Logo context="header" size="88px"/>
				<LogoutHeaderButton type="button" onClick={ () => {} } iconSource={ logout } iconSize="24px">Sign out</LogoutHeaderButton>
			</MobileHeader>
		</MemoryRouter>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
