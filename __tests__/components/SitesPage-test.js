import React from 'react';
import SitesPage from '../../src/components/SitesPage';
import { createComponentWithIntl } from "../../utils";
import { onSearchQueryChange } from "../../src/components/Search";

jest.mock( "../../src/reducers/search.js", () => {
	return {
		onSearchQueryChange: jest.fn( ( state = {} ) => { return { query: "onSearchQueryChange" }; } ),
	}
} );

jest.mock( "react-select", () => {
		return "mockSelectComponent"
	}
);

let plugins = [
	{
		glNumber: 111,
		ids: [ "1" ],
		icon: "test.jpg",
		name: "Test",
		type: "plugin",
	},
	{
		glNumber: 222,
		ids: [ "2" ],
		icon: "test.jpg",
		name: "Test2",
		type: "plugin",
	},
	{
		glNumber: 333,
		ids: [ "3" ],
		icon: "test.jpg",
		name: "Test3",
		type: "plugin",
	},
	{
		glNumber: 444,
		ids: [ "4" ],
		icon: "test.jpg",
		name: "Test4",
		type: "plugin",
	},
	{
		glNumber: 555,
		ids: [ "5" ],
		icon: "test.jpg",
		name: "Test5",
		type: "typo3",
	}
];

let activeSubscriptions = [
	{
		product: {
			id: 1,
		},
		productId: "1",
	},
	{
		product: {
			id: 2,
		},
		productId: "2",
	},
];

/*
Always opening all features, since we don't have to test whether the toggle works.
This way we can immediately test the new components, and don't have to add tests when we remove the feature flag.
*/
jest.mock( "../../src/functions/features", () => {
		return {
			hasAccessToFeature: jest.fn( () => { return true; } ),
		};
	}
);

test('the sites page component with a site matches the snapshot', () => {
	const site = {
		id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
		siteName: "www.yoast.com",
		activeSubscriptions: activeSubscriptions,
		siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		siteType: "wordpress"
	};

	const component = createComponentWithIntl(
		<SitesPage
			sites={ [ site ] }
			addSite={ () => {} }
			onSearchChange={ () => {} }
			onConnect={ () => {} }
			onClose={ () => {} }
			onManage={ () => {} }
			onChange={ () => {} }
			configureConfigurationServiceRequest={ () => {} }
			onConfigurationModalClose={ () => {} }
			openConfigurationServiceRequestModal={ () => {} }
			errorFound={ false }
			query=""
			plugins={ plugins } />

	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component without sites handling an onclick event on the add site button', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [] }
		           addSite={ () => { return 'Add site'; } }
		           onSearchChange={ () => {} }
		           onConnect={ () => {} }
		           onClose={ () => {} }
		           onChange={ () => {} }
		           errorFound={ false }
		           onManage={ () => {} }
		           configureConfigurationServiceRequest={ () => {} }
		           onConfigurationModalClose={ () => {} }
		           openConfigurationServiceRequestModal={ () => {} }
		           query=""
		           plugins={ [] } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[3].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component with sites handling an onclick event on the add site button', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
				siteName: "www.yoast.com",
				siteType: "wordpress",
				activeSubscriptions: activeSubscriptions,
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},] }
		           addSite={ () => { return 'Add site'; } }
		           onSearchChange={ () => {} }
		           onConnect={ () => {} }
		           onClose={ () => {} }
				   onChange={ () => {} }
				   errorFound={ false }
				   onManage={ () => {} }
				   configureConfigurationServiceRequest={ () => {} }
				   onConfigurationModalClose={ () => {} }
				   openConfigurationServiceRequestModal={ () => {} }
				   query=""
				   plugins={ plugins } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[1].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
