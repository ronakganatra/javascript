import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SiteSubscriptionDetail from '../../src/components/SiteSubscriptionDetail';

let subscription = {
	id: "very-unique-sub-id",
	isEnabled: true,
	name: "Subscription name",
	productName: "Productname",
	productId: "productId",
	productLogo: "icon.svg",
	limit: 20,
	used: 14,
	price: 6900,
	currency: "USD",
};

test('the sitesubscription matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptionDetail { ...subscription }
			onAddMoreLicensesClick={ () => {} }
			onToggleSubscription={ () => {} }
			onMoreInfoClick={ () => {} }
			onSettingsClick={ () => {} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('an add more licenses button should be shown when no more licenses are available', () => {
	subscription = Object.assign( {}, subscription, { used: 20 } );

	const component = createComponentWithIntl(
		<SiteSubscriptionDetail { ...subscription }
			onAddMoreLicensesClick={ () => {} }
			onToggleSubscription={ () => {} }
			onMoreInfoClick={ () => {} }
			onSettingsClick={ () => {} } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
