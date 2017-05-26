import React from 'react';
import SitesPage from '../../src/components/SitesPage';
import { createComponentWithIntl } from "../../utils";
import { onSearchQueryChange } from "../../src/components/Search";

jest.mock( "../../src/reducers/search.js", () => {
	return {
		onSearchQueryChange: jest.fn( ( state = {} ) => { return { query: "onSearchQueryChange" }; } ),
	}
} );

let plugins = [
	{
		id: "0001",
		icon: "test.jpg",
		name: "Test",
	},
	{
		id: "0002",
		icon: "test.jpg",
		name: "Test2",
	},
	{
		id: "0003",
		icon: "test.jpg",
		name: "Test3",
	},
	{
		id: "0004",
		icon: "test.jpg",
		name: "Test4",
	}
];

let activeSubscriptions = [
	{
		productId: "0001",
	},
	{
		productId: "0002",
	},
]

test('the sites page component with no sites matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [] } addSite={ () => {} } onSearchChange={ () => {} } onConnect={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ true } query="" onManage={ () => {} } plugins={ [] } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component with a site matches the snapshot', () => {
	const site = {
		id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
		siteName: "www.yoast.com",
		activeSubscriptions: activeSubscriptions,
		siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
	};
	const component = createComponentWithIntl(
		<SitesPage sites={ [ site ] } addSite={ () => {} } onSearchChange={ () => {} } onConnect={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ false } query="" onManage={ () => {} } plugins={ plugins } />

	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component without sites handling an onclick event on the add site button', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [] } addSite={ () => { return 'Add site'; } } onSearchChange={ () => {} } onConnect={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ false } query="" onManage={ () => {} } plugins={ [] } />
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
				activeSubscriptions: activeSubscriptions,
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},] } addSite={ () => { return 'Add site'; } } onSearchChange={ () => {} } onConnect={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ false } query="" onManage={ () => {} } plugins={ plugins } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[1].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
