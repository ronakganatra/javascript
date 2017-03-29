import React from 'react';
import renderer from 'react-test-renderer';

import SiteSubscriptionDetail from '../../src/components/SiteSubscriptionDetail';

let subscription = {
	isEnabled: true,
	productName: "Productname",
	productLogo: "icon.svg",
	slots: {
		amountAvailable: 20,
		amountUsed: 14,
		addMoreSlots: "Add more slots for $69",
		onAddMoreSlotsClick: () => {
			console.log( "Add more slots" );
		},
	},
	onToggleSubscription: () => {
		console.log( "on toggle subscription" );
	},
	onMoreInfoClick: () => {
		console.log( "on more info click" );
	},
	onSettingsClick: () => {
		console.log( "on settings click" );
	},
};

test('the sitesubscription matches the snapshot', () => {
	const component = renderer.create(
		<SiteSubscriptionDetail {...subscription} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the sitesubscription onToggleSubscription handling', () => {
	const component = renderer.create(
		<SiteSubscriptionDetail {...subscription} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback on the toggle.
	tree.props.onToggleSubscription;

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the sitesubscription onMoreInfoClick handling', () => {
	const component = renderer.create(
		<SiteSubscriptionDetail {...subscription} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback on the toggle.
	tree.props.onMoreInfoClick;

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the sitesubscription onSettingsClick handling', () => {
	const component = renderer.create(
		<SiteSubscriptionDetail {...subscription} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback on the toggle.
	tree.props.onSettingsClick;

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('the sitesubscription onAddMoreSlotsClick handling', () => {
	const component = renderer.create(
		<SiteSubscriptionDetail {...subscription} />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback on the toggle.
	tree.children[ 1 ].children[ 2 ].props.onClick();

	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
