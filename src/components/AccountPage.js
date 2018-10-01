import React, { Fragment } from "react";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import SubscriptionsPageContainer from "../containers/SubscriptionsPage";
import ProfilePageContainer from "../containers/ProfilePage";
import OrderPage from "../containers/OrdersPage";
import { RenewalNotificationContainer } from "../containers/SubscriptionsPage";

const itemRoutes = [
	{
		component: SubscriptionsPageContainer,
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
		<Fragment>
			<RenewalNotificationContainer />
			<SubNavigation itemRoutes={itemRoutes} />
			<SubNavigationItem itemRoutes={itemRoutes} />
			<SubNavigationItem itemRoutes={ [
				{
					path: "/account",
					component: SubscriptionsPageContainer,
				},
			] } />
		</Fragment>
	);
}
