import React from "react";
import { mapStateToProps } from "../../src/containers/RenewalNotification";

test( 'the mapStateToProps function', () => {
	const DAY_IN_SECONDS = 24 * 60 * 60;
	var tomorrow = new Date( Date.now() + 1 * DAY_IN_SECONDS );
	var nextWeek = new Date( Date.now() + 7 * DAY_IN_SECONDS );
	var twoWeeksFromNow = new Date( Date.now() + 14 * DAY_IN_SECONDS );


	let state = {
		entities: {
			subscriptions: {
				allIds: [ "a", "b", "c", "d", "e", "f" ],
				byId:
					{
						a: {
							id: 'a',
							name: 'manual WooCommerce subscription renewal expires tomorrow',
							nextPayment: tomorrow,
							requiresManualRenewal: true,
							status: 'active',
							renewalUrl: 'my.yoast.com'
						},
						b: {
							id: 'b',
							name: 'manual WooCommerce subscription renewal expires two weeks from now',
							nextPayment: twoWeeksFromNow,
							requiresManualRenewal: true,
							status: 'active',
							renewalUrl: 'my.yoast.com'
						},
						c: {
							id: 'c',
							name: 'manual EDD subscription renewal expires next week',
							endDate: nextWeek,
							requiresManualRenewal: true,
							status: 'active',
							renewalUrl: 'my.yoast.com'
						},
						d: {
							id: 'd',
							name: 'is already cancelled',
							nextPayment: nextWeek,
							requiresManualRenewal: true,
							status: 'pending-cancel',
							renewalUrl: 'my.yoast.com'
						},
						e: {
							id: 'e',
							name: 'auto-renewal',
							nextPayment: nextWeek,
							requiresManualRenewal: false,
							status: 'active',
							renewalUrl: 'my.yoast.com'
						},
						f: {
							id: 'f',
							name: 'no renewal url',
							nextPayment: nextWeek,
							requiresManualRenewal: true,
							status: 'active',
						},
					},
			}
		}
	};

	let expected = {
		upcomingRenewals: [
			{
				id: 'a',
				name: 'manual WooCommerce subscription renewal expires tomorrow',
				hasNextPayment: true,
				nextPayment: tomorrow,
				endDate: null,
				status: 'active',
				renewalUrl: 'my.yoast.com'
			},
			{
				id: 'c',
				name: 'manual EDD subscription renewal expires next week',
				hasNextPayment: true,
				nextPayment: nextWeek,
				endDate: nextWeek,
				status: 'active',
				renewalUrl: 'my.yoast.com'
			},
			{
				id: 'b',
				name: 'manual WooCommerce subscription renewal expires two weeks from now',
				hasNextPayment: true,
				nextPayment: twoWeeksFromNow,
				endDate: null,
				status: 'active',
				renewalUrl: 'my.yoast.com'
			},
		],
	};

	expect( mapStateToProps( state ) ).toEqual( expected );
} );
