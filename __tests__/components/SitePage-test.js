import React from 'react';
import SitePage from '../../src/components/SitePage';
import { createComponentWithIntl } from "../../utils";
import SeoIcon from "../../src/icons/Yoast/Yoast_SEO_Icon_Small.svg";
import LocalIcon from "../../src/icons/Yoast/Local_SEO_Icon_Small.svg";
import { MemoryRouter } from "react-router-dom";

test('the site page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
		<SitePage
				site={ {
					id: "abcd",
					url: "http://yoast.com",
					hostname: "yoast.com",
					type: "wordpress",
					path: "/",
					creationDate: "2017-04-11T00:00:00.000Z",
					userId: 2,
					header: "http://placehold.it/1480x380",
				} }
				header="http://placehold.it/1480x380"
				subscriptions={ [
					  {
						  id: "bla",
						  productId: "Yoast SEO",
						  startDate: "2017-04-11T00:00:00.000Z",
						  endDate: "2017-04-11T00:00:00.000Z",
						  subscriberId: 2,
						  productLicenses: {
							  amountAvailable: 10,
							  amountUsed: 5,
							  addMoreLicenses: "Add more licenses",
						  },
						  productLogo: SeoIcon,
					  },
					  {
						  id: "bla2",
						  productId: "Local SEO",
						  startDate: "2017-04-11T00:00:00.000Z",
						  endDate: "2017-04-11T00:00:00.000Z",
						  subscriberId: 2,
						  productLicenses: {
							  amountAvailable: 10,
							  amountUsed: 7,
							  addMoreLicenses: "Add more licenses",
						  },
						  productLogo: LocalIcon,
					  },
				] }
				uiSite={ {
					removing: false,
					subscriptions: {
						error: "",
						toggling: false,
					},
				} }
				onAddMoreSubscriptionsClick={ () => {} }
				onMoreInfoClick={ () => {} }
				onToggleSubscription={ () => {} }
				onRemove={ () => {} }
				onClose={ () => {} }
				onToggleDisabled={ () => {} }
				onConfigurationModalClose={ () => {} }
				configureConfigurationServiceRequest={ () => {} }
				openConfigurationServiceRequestModal={ () => {} }
				addSubscriptionModal= { { id: "bla" } } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the site page component matches the snapshot for a site in a directory', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
		<SitePage
				site={ {
					id: "abcd",
					url: "http://yoast.com",
					hostname: "yoast.com",
					path: "/path/",
					creationDate: "2017-04-11T00:00:00.000Z",
					userId: 2,
					header: "http://placehold.it/1480x380",
					type: "wordpress",
				} }
				header="http://placehold.it/1480x380"
				subscriptions={ [
					{
						id: "bla",
						productId: "Yoast SEO",
						startDate: "2017-04-11T00:00:00.000Z",
						endDate: "2017-04-11T00:00:00.000Z",
						subscriberId: 2,
						productLicenses: {
							amountAvailable: 10,
							amountUsed: 5,
							addMoreLicenses: "Add more licenses",
						  },
						productLogo: SeoIcon,
					},
					{
						id: "bla2",
						productId: "Local SEO",
						startDate: "2017-04-11T00:00:00.000Z",
						endDate: "2017-04-11T00:00:00.000Z",
						subscriberId: 2,
						productLicenses: {
							amountAvailable: 10,
							amountUsed: 7,
							addMoreLicenses: "Add more licenses",
						},
						productLogo: LocalIcon,
					  },
				] }
				uiSite={ {
					removing: false,
					subscriptions: {
						error: "",
						toggling: false,
					},
				} }
				onAddMoreSubscriptionsClick={ () => {} }
				onMoreInfoClick={ () => {} }
				onToggleSubscription={ () => {} }
				onRemove={ () => {} }
				onClose={ () => {} }
				onToggleDisabled={ () => {} }
				onConfigurationModalClose={ () => {} }
				configureConfigurationServiceRequest={ () => {} }
				openConfigurationServiceRequestModal={ () => {} }
				addSubscriptionModal= { { id: "bla" } } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test('the site page component matches the snapshot for a site on the TYPO3 platform', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SitePage
				site={ {
					id: "abcd",
					url: "http://yoast.com",
					hostname: "yoast.com",
					type: "typo3",
					path: "/",
					creationDate: "2017-04-11T00:00:00.000Z",
					userId: 2,
					header: "http://placehold.it/1480x380",
				} }
				header="http://placehold.it/1480x380"
				subscriptions={ [
					{
						id: "bla",
						productId: "Yoast SEO",
						startDate: "2017-04-11T00:00:00.000Z",
						endDate: "2017-04-11T00:00:00.000Z",
						subscriberId: 2,
						productLicenses: {
							amountAvailable: 10,
							amountUsed: 5,
							addMoreLicenses: "Add more licenses",
						},
						productLogo: SeoIcon,
					},
					{
						id: "bla2",
						productId: "Local SEO",
						startDate: "2017-04-11T00:00:00.000Z",
						endDate: "2017-04-11T00:00:00.000Z",
						subscriberId: 2,
						productLicenses: {
							amountAvailable: 10,
							amountUsed: 7,
							addMoreLicenses: "Add more licenses",
						},
						productLogo: LocalIcon,
					},
				] }
				uiSite={ {
					removing: false,
					subscriptions: {
						error: "",
						toggling: false,
					},
				} }
				onAddMoreSubscriptionsClick={ () => {} }
				onMoreInfoClick={ () => {} }
				onToggleSubscription={ () => {} }
				onRemove={ () => {} }
				onClose={ () => {} }
				onToggleDisabled={ () => {} }
				onConfigurationModalClose={ () => {} }
				configureConfigurationServiceRequest={ () => {} }
				openConfigurationServiceRequestModal={ () => {} }
				addSubscriptionModal= { { id: "bla" } } />
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
