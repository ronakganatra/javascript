import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { MemoryRouter as Router } from "react-router-dom";
import MainMenu, { MainMenuRoutes } from "../../src/components/Menu";
import menuItems from "../../src/config/Menu";

test( 'the menu matches the snapshot', () => {

	global.document = {
		readyState: true,
	};

	const component = createComponentWithIntl(
		<Router>
			<MainMenu menuRoutes={ menuItems } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
