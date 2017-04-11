import React from 'react';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptionDetailList from '../../src/components/SiteSubscriptionDetailList';
import SiteSubscriptionDetail from '../../src/components/SiteSubscriptionDetail';

test('the site subscription detail list component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptionDetailList siteSubscriptions={
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
					productName="Local SEO"/>,
			]
		} ></SiteSubscriptionDetailList>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


