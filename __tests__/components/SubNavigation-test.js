import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import SubNavigation, { SubNavigationItem } from "../../src/components/SubNavigation";

let itemRoutes = [
	{
		component: ( props ) => { return null; },
		path: "/account/subscriptions",
		title: "Subscriptions",
	},
	{
		component: ( props ) => { return null; },
		path: "/account/orders",
		title: "Orders",
	},
	{
		component: ( props ) => { return null; },
		path: "/account/profile",
		title: "Profile",
	},
];

test('the subnavigation component matches the snapshot', () => {
	const component = renderer.create(
		<Router>
			<div>
				<SubNavigation itemRoutes={ itemRoutes }/>
				<SubNavigationItem itemRoutes={ itemRoutes } />
			</div>
		</Router>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
