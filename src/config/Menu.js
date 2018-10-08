import React from "react";
import HomeIcon from "../icons/Home.js";
import SitesIcon from "../icons/Sites.js";
import CoursesIcon from "../icons/Courses.js";
import UserIcon from "../icons/User.js";
import DownloadsIcon from "../icons/Download.js";
import SitesPageContainer from "../containers/SitesPage";
import AccountPage from "../components/AccountPage";
import DownloadsPage from "../containers/DownloadsPage";
import CoursesPage from "../containers/CoursesPage";
import HomePage from "../containers/HomePage";

const menuItems = [
	{
		showInMenu: true,
		path: "/",
		titleKey: "home",
		iconSource: <HomeIcon />,
		component: HomePage,
		exact: true,
		isActive: ( match, location ) => {
			return location.pathname === "/";
		},
	},
	{
		showInMenu: true,
		path: "/sites",
		titleKey: "sites",
		iconSource: <SitesIcon />,
		component: SitesPageContainer,
		exact: true,
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
		exact: true,
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
