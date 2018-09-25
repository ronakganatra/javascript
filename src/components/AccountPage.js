import React from "react";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import SubscriptionsPage from "../containers/SubscriptionsPage";
import ProfilePageContainer from "../containers/ProfilePage";
import OrderPage from "../containers/OrdersPage";

const itemRoutes = [
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
 * Returns the rendered Account Page component.
 *
 * @returns {ReactElement} The rendered account page.
 */
export default function AccountPage() {
	return (
		<div>
			<SubNavigation itemRoutes={ itemRoutes } />
			<SubNavigationItem itemRoutes={ itemRoutes } />
			<SubNavigationItem
				itemRoutes={ [
					{
						path: "/account",
						component: SubscriptionsPage,
					},
				] }
			/>
		</div>
	);
}
