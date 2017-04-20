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
							myYoastUserId: 2,
							productSlots: {
								amountAvailable: 11,
								amountUsed: 5,
								addMoreSlots: "Add more slots",
							},
							productLogo: "http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png",
						},
					},
					allIds: [ "subscriptiontestId" ],
				},
			},
			router: {
				location: "sites/497490e6-eb8d-4627-be9b-bfd33fc217f1",
			},
			ui: {
				site: {
					subscriptions: {
						retrievingSiteSubscriptions: false,
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
			myYoastUserId: 2,
			productSlots: {
				amountAvailable: 11,
				amountUsed: 5,
				addMoreSlots: "Add more slots",
			},
			productLogo: "http://icons.iconarchive.com/icons/yellowicon/game-stars/256/Mario-icon.png",
		} ],
		loadingSubscriptions: false,
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );

} );
