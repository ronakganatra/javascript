import React from 'react';
import { createComponentWithIntl } from "../../utils";
import SiteSubscriptionDetailList from '../../src/components/SiteSubscriptionDetailList';
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../../src/icons/Yoast/Local_SEO_Icon_Small.svg";
import { MemoryRouter } from "react-router-dom";

test('the site subscription detail list component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SiteSubscriptionDetailList
				siteSubscriptions={ [
					{
						id: "bla",
						name: "Yoast SEO",
						productId: "1",
						startDate: "2017-04-11T00:00:00.000Z",
						endDate: "2017-04-11T00:00:00.000Z",
						subscriberId: 2,
						limit: 10,
						used: 5,
						price: 5900,
						product: {
							glNumber: 111,
							id: "1",
							name: "string",
							description: "string",
							storeUrl: "string",
							downloadUrl: "string",
							isDownloadOnly: false,
							icon: SeoIcon,
							shopProductType: "string",
							shopStatus: "string",
							price: 0,
							shopRegularPrice: 0,
							shopTaxStatus: "string",
							shopTaxClass: "string",
							lastUpdated: "2017-04-26T11:21:02.597Z",
							currentVersion: 0,
							changelog: "string"
						},
						productLogo: SeoIcon,
					},
					{
						id: "bla2",
						name: "Local SEO",
						productId: "2",
						startDate: "2017-04-11T00:00:00.000Z",
						endDate: "2017-04-11T00:00:00.000Z",
						subscriberId: 2,
						limit: 10,
						used: 7,
						price: 6900,
						product: {
							glNumber: 222,
							id: "2",
							name: "string",
							description: "string",
							storeUrl: "string",
							downloadUrl: "string",
							isDownloadOnly: false,
							icon: LocalIcon,
							shopProductType: "string",
							shopStatus: "string",
							price: 0,
							shopRegularPrice: 0,
							shopTaxStatus: "string",
							shopTaxClass: "string",
							lastUpdated: "2017-04-26T11:21:02.597Z",
							currentVersion: 0,
							changelog: "string"
						},
						productLogo: LocalIcon,
					},
				] }
				plugins={
					[
						{
							glNumber: 111,
							ids: [ "1" ],
							name: "Yoast SEO Premium",
							type: "plugin",
							icon: "icon.png",
							currency: "USD",
							price: 123,
							limit: 2,
							used: 1,
							storeUrl: "http://url1.com",
						},
						{
							glNumber: 222,
							ids: [ "2" ],
							name: "Yoast SEO Local",
							type: "plugin",
							icon: "icon2.png",
							currency: "USD",
							price: 123,
							limit: 2,
							used: 2,
							storeUrl: "http://url2.com",
						},
					]
				}
				onAddMoreSubscriptionsClick={ () => {
					console.log( "add more slots" );
				} }
				onMoreInfoClick={ () => {
					console.log( "more info" );
				} }
				onToggleSubscription={ () => {
					console.log( "toggled" );
				} }
				onClose={ () => {
					console.log( "closed" );
				} }
				onToggleDisabled={ () => {
					console.log( "toggle disabled" )
				} }
			/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
