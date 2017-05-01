import React from "react";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import SubscriptionsPage from "../containers/SubscriptionsPage";
import ProfilePageContainer from "../containers/ProfilePage";
import OrderPage from "../containers/OrdersPage";

let itemRoutes = [
	{
		component: SubscriptionsPage,
		path: "/account/subscriptions",
		title: "Subscriptions",
		isActive: ( match, location ) => {
			if ( match ) {
				return match;
			}

			return location.pathname === "/account" || location.pathname === "/account/";
		},
	},
	{
		component: OrderPage,
		path: "/account/orders",
		title: "Orders",
	},
	{
		component: ProfilePageContainer,
		path: "/account/profile",
		title: "Profile",
	},
];

/**
 * Some stuff.
 *
 * @returns {ReactElement} The rendered stuff.
 */
export default function AccountPage() {
	return (
		<div>
			<SubNavigation itemRoutes={itemRoutes} />
			<SubNavigationItem itemRoutes={itemRoutes} />
			<SubNavigationItem itemRoutes={ [
				{
					path: "/account",
					component: SubscriptionsPage,
				},
			] } />
		</div>
	);
}
