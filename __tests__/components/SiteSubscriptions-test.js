import React from 'react';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptions from '../../src/components/SiteSubscriptions';
import SiteSubscriptionDetail from '../../src/components/SiteSubscriptionDetail';

test('the site subscriptions component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptions siteSubscriptions={
			[
				<SiteSubscriptionDetail
					onMoreInfoClick={ () => {
						console.log( "more info" );
					} }
					onSettingsClick={ () => {
						console.log( "more settings" );
					} }
					productLogo=""
					isEnabled={false}
					productName="Yoast SEO"
					slots={
						{ amountAvailable: 10 }
					}
				/>,
				<SiteSubscriptionDetail
					onMoreInfoClick={ () => {
						console.log( "more info" );
					} }
					onSettingsClick={ () => {
						console.log( "more settings" );
					} }
					productLogo=""
					isEnabled={false}
					slots={
						{ amountAvailable: 10 }
					}
					productName="Yoast SEO"/>,
			]
		} ></SiteSubscriptions>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


