import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SiteSubscriptionDetail from '../../src/components/SiteSubscriptionDetail';
import { MemoryRouter } from "react-router-dom";

let subscription = {
	id: "very-unique-product-id",
	isEnabled: true,
	name: "Subscription name",
	productName: "Productname",
	subscriptionId: "subId",
	icon: "icon.svg",
	limit: 20,
	used: 14,
	price: 6900,
	currency: "USD",
	storeUrl: "http://store.url.com",
};

test('the sitesubscription matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SiteSubscriptionDetail { ...subscription }
                onAddMoreSubscriptionsClick={ () => {} }
				onToggleSubscription={ () => {} }
				onMoreInfoClick={ () => {} }
				onClose={ () => {} }
				onShop={ "" }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('an add more licenses button should be shown when no more licenses are available', () => {
	subscription = Object.assign( {}, subscription, { used: 20 } );

	const component = createComponentWithIntl(
		<MemoryRouter>
			<SiteSubscriptionDetail { ...subscription }
                onAddMoreSubscriptionsClick={ () => {} }
				onToggleSubscription={ () => {} }
				onMoreInfoClick={ () => {} }
				onClose={ () => {} }
				onShop={ "" }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
