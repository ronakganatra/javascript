import React from 'react';
import renderer from 'react-test-renderer';

import Site from '../../src/components/Site';

test('the site component matches the snapshot', () => {
	const component = renderer.create(
		<Site activeSubscriptions={ [ "woo", "video" ] } siteName="yoast.com" siteIcon="" />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the manage button handling an onclick event', () => {
	const component = renderer.create(
		<Site
			activeSubscriptions={ [ "woo", "video" ] }
			siteName="yoast.com"
			siteIcon=""
			onClickManage={ () => {
				return 'clicked';
			} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	console.log(tree);
	console.log(tree.children[3].props);
	tree.children[3].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
