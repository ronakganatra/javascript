import React from 'react';
import { createComponentWithIntl } from "../../utils";
import MobileHeader from '../../src/components/MobileHeader';
import { BeaconHeaderButton, LogoutHeaderButton } from "../../src/components/MobileHeader";
import { Logo } from "../../src/components/Logo";
import logout from "../../src/icons/logout.svg";
import questionCircle from "../../src/icons/question-circle.svg";
import { MemoryRouter } from "react-router-dom";

test('the responsive site header matches the snapshot', () => {

	let match = {
		path: "http://my.yoast.test:3001/sites/136c7b9a-4c96-4598-8c10-345944c2f8a7",
	};

	const component = createComponentWithIntl(
		<MemoryRouter>
			<MobileHeader onLogoutClick={ () => {} } onBeaconClick={ () => {} } match={ match }>
				<BeaconHeaderButton type="button" onClick={ () => {} } iconSource={ questionCircle } iconSize="24px">Need help?</BeaconHeaderButton>
				<Logo context="header" size="88px"/>
				<LogoutHeaderButton type="button" onClick={ () => {} } iconSource={ logout } iconSize="24px">Sign out</LogoutHeaderButton>
			</MobileHeader>
		</MemoryRouter>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
