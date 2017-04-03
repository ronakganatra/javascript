import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import SubNavigation, { SubNavigationItem } from "../../src/components/SubNavigation";
import { NavigationItems } from "../../src/config/Menu";

test('the subnavigation component matches the snapshot', () => {
	const component = renderer.create(
		<Router>
			<div>
				<SubNavigation itemRoutes={ NavigationItems }/>
				<SubNavigationItem itemRoutes={ NavigationItems } />
			</div>
		</Router>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
