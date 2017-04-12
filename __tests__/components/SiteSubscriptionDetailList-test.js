import React from 'react';
import { createComponentWithIntl } from "../../utils";

import SiteSubscriptionDetailList from '../../src/components/SiteSubscriptionDetailList';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../../src/icons/Yoast/Local_SEO_Icon_Small.svg";

test('the site subscription detail list component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<SiteSubscriptionDetailList siteSubscriptions={ [
			{
				id: "bla",
				productId: "Yoast SEO",
				startDate: "2017-04-11T00:00:00.000Z",
				endDate: "2017-04-11T00:00:00.000Z",
				reoccurring: true,
				myYoastUserId: 2,
				productSlots: {
					amountAvailable: 10,
					amountUsed: 5,
					onAddMoreSlotsClick: () => {
						console.log( "add more slots" );
					},
					addMoreSlots: "Add more slots",
				},
				productLogo: SeoIcon,
			},
			{
				id: "bla2",
				productId: "Local SEO",
				startDate: "2017-04-11T00:00:00.000Z",
				endDate: "2017-04-11T00:00:00.000Z",
				reoccurring: true,
				myYoastUserId: 2,
				productSlots: {
					amountAvailable: 10,
					amountUsed: 7,
					onAddMoreSlotsClick: () => {
						console.log( "add more slots" );
					},
					addMoreSlots: "Add more slots",
				},
				productLogo: LocalIcon,
			},
		] }
			onMoreInfoClick={ () => {
				console.log( "more info" );
			} }
			onSettingsClick={ () => {
				console.log( "settings" );
			} }
			onToggleSubscription={ () => {
				console.log( "toggled" );
			} }
		/>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
