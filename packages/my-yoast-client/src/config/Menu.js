// External dependencies.
import React from "react";
import { defineMessages } from "react-intl";

// Internal dependencies.
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

const titles = defineMessages( {
	home: {
		id: "menu.title.home",
		defaultMessage: "Home",
	},
	sites: {
		id: "menu.title.sites",
		defaultMessage: "Sites",
	},
	courses: {
		id: "menu.title.courses",
		defaultMessage: "Courses",
	},
	downloads: {
		id: "menu.title.downloads",
		defaultMessage: "Downloads",
	},
	account: {
		id: "menu.title.account",
		defaultMessage: "Account",
	},
} );

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
		title: titles.home,
	},
	{
		showInMenu: true,
		path: "/sites",
		titleKey: "sites",
		iconSource: <SitesIcon />,
		component: SitesPageContainer,
		exact: true,
		title: titles.sites,
	},
	{
		showInMenu: true,
		path: "/courses",
		titleKey: "courses",
		iconSource: <CoursesIcon />,
		component: CoursesPage,
		exact: false,
		title: titles.courses,
	},
	{
		showInMenu: true,
		path: "/downloads",
		titleKey: "downloads",
		iconSource: <DownloadsIcon />,
		component: DownloadsPage,
		exact: true,
		title: titles.downloads,
	},
	{
		showInMenu: true,
		path: "/account",
		titleKey: "account",
		iconSource: <UserIcon />,
		component: AccountPage,
		exact: false,
		title: titles.account,
	},
];

export default menuItems;
