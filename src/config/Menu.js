import React from "react";
import SitesIcon from "../icons/Sites.js";
import CoursesIcon from "../icons/Courses.js";
import UserIcon from "../icons/User.js";
import DownloadsIcon from "../icons/Download.js";
import SitesPageContainer from "../containers/SitesPage";
import AccountPage from "../components/AccountPage";
import DownloadsPage from "../containers/DownloadsPage";
import CoursesPage from "../containers/CoursesPage";

const menuItems = [
	{
		showInMenu: true,
		path: "/sites",
		titleKey: "sites",
		iconSource: <SitesIcon />,
		component: SitesPageContainer,
		isActive: ( match, location ) => {
			if ( match ) {
				return true;
			}

			return location.pathname === "/";
		},
	},
	{
		showInMenu: true,
		path: "/courses",
		titleKey: "courses",
		iconSource: <CoursesIcon />,
		component: CoursesPage,
		exact: false,
	},
	{
		showInMenu: true,
		path: "/downloads",
		titleKey: "downloads",
		iconSource: <DownloadsIcon />,
		component: DownloadsPage,
		exact: false,
	},
	{
		showInMenu: true,
		path: "/account",
		titleKey: "account",
		iconSource: <UserIcon />,
		component: AccountPage,
		exact: false,
	},
];

export default menuItems;
