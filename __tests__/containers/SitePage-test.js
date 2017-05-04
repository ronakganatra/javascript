import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/SitePage'
import { linkSitePopupClose, linkSitePopupOpen, updateSiteUrl } from "../../src/actions/sites";
import { push } from "react-router-redux";

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
						}
					},
					allIds: [ "497490e6-eb8d-4627-be9b-bfd33fc217f1" ],
				},
				subscriptions: {
					byId: {
						"subscriptiontestId": {
							id: "subscriptiontestId",
							productId: "SEO for Sony",
							startDate: "2017-04-12T00:00:00.000Z",
							endDate: "2017-04-12T00:00:00.000Z",
							reoccurring: true,
							subscriberId: 2,
							slots: {
								amountAvailable: 11,
								amountUsed: 5,
								addMoreSlots: "Add more slots",
							},
							product: {
								id: "productid",
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
						},
					},
					allIds: [ "subscriptiontestId" ],
				},
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
		},
		subscriptions: [ {
			id: "subscriptiontestId",
			productId: "SEO for Sony",
			startDate: "2017-04-12T00:00:00.000Z",
			endDate: "2017-04-12T00:00:00.000Z",
			reoccurring: true,
			subscriberId: 2,
			slots: {
				amountAvailable: 11,
				amountUsed: 5,
				addMoreSlots: "Add more slots",
			},
			product: {
				id: "productid",
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
		loadingSubscriptions: false,
		uiSite: {
			removing: false,
			subscriptions: {
				error: "",
				toggling: false,
			},
		},
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );

} );
