import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Site from '../../src/components/Site';

test('the site component matches the snapshot', () => {
	const component = renderer.create(
		<Site activeSubscriptions={ [ "woo", "video" ] } siteName="yoast.com" siteIcon="" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the large manage button handling an onclick event', () => {
	const component = shallow(
		<Site
			activeSubscriptions={ [ "woo", "video" ] }
			siteName="yoast.com"
			siteIcon=""
			onClickManage={ () => {
				return 'clicked';
			} } />
	);

	expect( component.props().children[3].props.children.props.onClick() ).toEqual( 'clicked' );
});

test('the right arrow button handling an onclick event', () => {
	const component = shallow(
		<Site
			activeSubscriptions={ [ "woo", "video" ] }
			siteName="yoast.com"
			siteIcon=""
			onClickManage={ () => {
				return 'clicked';
			} } />
	);

	expect( component.props().children[4].props.children.props.onClick() ).toEqual( 'clicked' );
});
