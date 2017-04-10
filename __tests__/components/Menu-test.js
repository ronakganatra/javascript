import React from 'react';
import { createComponentWithIntl } from "../../utils";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainMenu, { MainMenuRoutes } from "../../src/components/Menu";
import menuItems from "../../src/config/Menu";

test('the menu matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<div>
				<MainMenu menuRoutes={ menuItems }/>
				<MainMenuRoutes menuRoutes={ menuItems } />
			</div>
		</Router>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
