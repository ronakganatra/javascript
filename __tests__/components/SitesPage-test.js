import React from 'react';
import SitesPage from '../../src/components/SitesPage';
import { createComponentWithIntl } from "../../utils";

test('the sites page component with no sites matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [] } addSite={ () => {} } changeSearchQuery={ () => {} } onLink={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ true } onManage={ () => {} } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component with a site matches the snapshot', () => {
	const site = {
		id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
		siteName: "www.yoast.com",
		activeSubscriptions: [ "woo", "video" ],
		siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
	};
	const component = createComponentWithIntl(
		<SitesPage sites={ [ site ] } addSite={ () => {} } changeSearchQuery={ () => {} } onLink={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ false } onManage={ () => {} } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component without sites handling an onclick event on the add site button', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [] } addSite={ () => { return 'Add site'; } } changeSearchQuery={ () => {} } onLink={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ true } onManage={ () => {} } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[4].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component with sites handling an onclick event on the add site button', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
				siteName: "www.yoast.com",
				activeSubscriptions: [ "woo", "video" ],
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},] } addSite={ () => { return 'Add site'; } } changeSearchQuery={ () => {} } onLink={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ false } onManage={ () => {} } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[1].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the sites page component with sites handling a changed search query', () => {
	const component = createComponentWithIntl(
		<SitesPage sites={ [
			{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
				siteName: "www.yoast.com",
				activeSubscriptions: [ "woo", "video" ],
				siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
			},] } addSite={ () => {} } changeSearchQuery={ () => { return 'Query changed'; } } onLink={ () => {} } onClose={ () => {} }
				   onChange={ () => {} } errorFound={ false } onManage={ () => {} } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();

	// manually trigger the callback.
	tree.children[0].children[0].children[1].props.onChange();

	// re-rendering
	tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
