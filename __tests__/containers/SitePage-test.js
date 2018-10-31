import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/SitePage'
import { siteRemove } from "../../src/actions/site";

jest.mock( "../../src/actions/site", () => {
	return {
		siteRemove: ( siteId ) => { return true; },
	};
} );

test('the mapStateToProps function', () => {
	let state = {
			entities: {
				sites: {
					byId: {
						"497490e6-eb8d-4627-be9b-bfd33fc217f1": {
							"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
							"url": "http://yoast.com",
							"creationDate": "2017-03-21T08:54:09.415Z",
							"userId": 1,
							"type": "wordpress",
						}
					},
					allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				},
				subscriptions: {
					byId: {
						"subscriptiontestId": {
							id: "subscriptiontestId",
							productId: "productid1",
							startDate: "2017-04-12T00:00:00.000Z",
							endDate: "2017-04-12T00:00:00.000Z",
							subscriberId: 2,
							licenses: {
								amountAvailable: 11,
								amountUsed: 5,
								addMoreLicenses: "Add more licenses",
							},
							product: {
								id: "productid1",
								name: "string",
								description: "string",
								storeUrl: "string",
								downloadUrl: "string",
								isDownloadOnly: false,
								icon: "https://image.flaticon.com/teams/new/1-freepik.jpg",
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
							used: 1,
						},
					},
					allIds: [ "subscriptiontestId" ],
				},
				products: {
					byId: {
						"productid1": {
							id: "productid1",
							name: "Yoast SEO Premium",
							type: "plugin",
							icon: "icon.png",
							currency: "USD",
							price: 123,
							glNumber: 222,
							sourceShopId: 1,
							storeUrl: "string",
						},
						"productid2": {
							id: "productid2",
							name: "Yoast SEO Local",
							type: "plugin",
							icon: "icon.png",
							currency: "USD",
							price: 123,
							glNumber: 111,
							sourceShopId: 1,
							storeUrl: "string",
						},
					},
					allIds: [ "productid1", "productid2" ],
				},
				productGroups: {
					byId: {
						"pg1": {
							id: "pg1",
							name: "Yoast SEO Premium",
							slug: "wp-seo-premium",
							parentId: "pg3",
							products: [
								{
									id: "productid1",
									name: "Yoast SEO Premium",
									type: "plugin",
									icon: "icon.png",
									currency: "USD",
									price: 123,
									glNumber: 222,
									sourceShopId: 1,
									storeUrl: "string",
								},
							],
						},
						"pg2": {
							id: "pg2",
							name: "Yoast SEO Local",
							slug: "wp-seo-local",
							parentId: "pg3",
							products: [
								{
									id: "productid2",
									name: "Yoast SEO Local",
									type: "plugin",
									icon: "icon.png",
									currency: "USD",
									price: 123,
									glNumber: 111,
									sourceShopId: 1,
									storeUrl: "string",
								},
							],
						},
						"pg3": {
							id: "pg3",
							name: "Plugins",
							slug: "all-plugins",
							parentId: null,
							products: [
								{
									id: "productid1",
									name: "Yoast SEO Premium",
									type: "plugin",
									icon: "icon.png",
									currency: "USD",
									price: 123,
									glNumber: 222,
									sourceShopId: 1,
									storeUrl: "string",
								},
								{
									id: "productid2",
									name: "Yoast SEO Local",
									type: "plugin",
									icon: "icon.png",
									currency: "USD",
									price: 123,
									glNumber: 111,
									sourceShopId: 1,
									storeUrl: "string",
								},
							],
						}
					},
					allIds: [ "pg1", "pg2", "pg3" ],
				},
				configurationServiceRequests: {
					byId: {},
					allIds: [],
				}
			},
			router: {
				location: "sites/497490e6-eb8d-4627-be9b-bfd33fc217f1",
			},
			ui: {
				subscriptions: {
					requesting: false,
				},
				site: {
					removing: false,
					subscriptions: {
						error: "",
						toggling: false,
					},
				},
				configurationServiceRequests: {
					configurationServiceRequestModalOpen: "configurationServiceRequestModalOpen",
					configurationServiceRequestModalSiteId: "configurationServiceRequestModalSiteId",
				},
				addSubscriptionModal: "addSubscriptionModal",
			},
	};

	let ownProps = {
		match: {
			params: {
				id: "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			},
		},
	};

	let expected = {
		site: {
			"id": "497490e6-eb8d-4627-be9b-bfd33fc217f1",
			"url": "http://yoast.com",
			"creationDate": "2017-03-21T08:54:09.415Z",
			"userId": 1,
			"type": "wordpress",
		},
		subscriptions: [ {
			id: "subscriptiontestId",
			productId: "productid1",
			startDate: "2017-04-12T00:00:00.000Z",
			endDate: "2017-04-12T00:00:00.000Z",
			subscriberId: 2,
			licenses: {
				amountAvailable: 11,
				amountUsed: 5,
				addMoreLicenses: "Add more licenses",
			},
			product: {
				id: "productid1",
				name: "string",
				description: "string",
				storeUrl: "string",
				downloadUrl: "string",
				isDownloadOnly: false,
				icon: "https://image.flaticon.com/teams/new/1-freepik.jpg",
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
			used: 1,
			price: 0,
			productLogo: "https://image.flaticon.com/teams/new/1-freepik.jpg",
			isEnabled: false,
		} ],
		plugins: [
			{
				id: "pg1",
				parentId: "pg3",
				name: "Yoast SEO Premium",
				slug: "wp-seo-premium",
				icon: "icon.png",
				currency: "USD",
				used: 0,
				limit: 0,
				isEnabled: false,
				isAvailable: false,
				hasSubscriptions: false,
				subscriptionId: "",
				glNumber: 222,
				storeUrl: "string",
				products: [
					{
						id: "productid1",
						name: "Yoast SEO Premium",
						type: "plugin",
						icon: "icon.png",
						currency: "USD",
						price: 123,
						glNumber: 222,
						sourceShopId: 1,
						storeUrl: "string",
					},
				],
			},
			{
				id: "pg2",
				parentId: "pg3",
				name: "Yoast SEO Local",
				slug: "wp-seo-local",
				icon: "icon.png",
				currency: "USD",
				used: 0,
				limit: 0,
				isEnabled: false,
				isAvailable: false,
				hasSubscriptions: false,
				subscriptionId: "",
				glNumber: 111,
				storeUrl: "string",
				products: [
					{
						id: "productid2",
						name: "Yoast SEO Local",
						type: "plugin",
						icon: "icon.png",
						currency: "USD",
						price: 123,
						glNumber: 111,
						sourceShopId: 1,
						storeUrl: "string",
					},
				],
			},
		],
		loadingSubscriptions: false,
		uiSite: {
			removing: false,
			subscriptions: {
				error: "",
				toggling: false,
			},
		},
		disablePlatformSelect: false,
		addSubscriptionModal: "addSubscriptionModal",
		availableConfigurationServiceRequests: [],
		configurationServiceRequestModalOpen: "configurationServiceRequestModalOpen",
		configurationServiceRequestModalSiteId: "configurationServiceRequestModalSiteId",
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );

} );

test('the mapDispatchToProps function to call siteRemove action with onRemove when confirm is true', () => {
	global.window = {};
	global.window.confirm = jest.fn( ( msg ) => { return true; } );

	const dispatch = jest.fn();
	let ownProps = {
		match: {
			params: {
				id: 123,
			},
		},
	};

	let props = mapDispatchToProps( dispatch, ownProps );

	props.onRemove();

	expect( dispatch ).toHaveBeenCalledWith( siteRemove( 123 ) );
} );

test('the mapDispatchToProps function to NOT call siteRemove action with onRemove when confirm is false', () => {
	global.window = {};
	global.window.confirm = jest.fn( ( msg ) => { return false; } );

	const dispatch = jest.fn();
	let ownProps = {
		match: {
			params: {
				id: 123,
			},
		},
	};

	let props = mapDispatchToProps( dispatch, ownProps );

	props.onRemove();

	expect( dispatch ).not.toHaveBeenCalledWith( siteRemove( 123 ) );
} );
