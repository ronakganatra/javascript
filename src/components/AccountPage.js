import React from "react";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import SubscriptionsPage from "../containers/SubscriptionsPage";
import ProfilePage from "../components/ProfilePage";
import OrderPage from "../containers/OrdersPage";

let itemRoutes = [
	{
		component: SubscriptionsPage,
		path: "/account/subscriptions",
		title: "Subscriptions",
	},
	{
		component: OrderPage,
		path: "/account/orders",
		title: "Orders",
	},
	{
		component: ProfilePage,
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
