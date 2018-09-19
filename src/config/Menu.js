import homeIcon from "../icons/home.svg";
import sitesIcon from "../icons/sites.svg";
import coursesIcon from "../icons/courses.svg";
import userIcon from "../icons/user.svg";
import downloadsIcon from "../icons/download.svg";
import SitesPageContainer from "../containers/SitesPage";
import AccountPage from "../components/AccountPage";
import DownloadsPage from "../containers/DownloadsPage";
import CoursesPage from "../containers/CoursesPage";
import HomePage from "../containers/HomePage";

let menuItems = [
	{
		showInMenu: true,
		path: "/",
		titleKey: "home",
		iconSource: homeIcon,
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
		iconSource: sitesIcon,
		component: SitesPageContainer,
		exact: true,
	},
	{
		showInMenu: true,
		path: "/courses",
		titleKey: "courses",
		iconSource: coursesIcon,
		component: CoursesPage,
		exact: false,
	},
	{
		showInMenu: true,
		path: "/downloads",
		titleKey: "downloads",
		iconSource: downloadsIcon,
		component: DownloadsPage,
		exact: true,
	},
	{
		showInMenu: true,
		path: "/account",
		titleKey: "account",
		iconSource: userIcon,
		component: AccountPage,
		exact: false,
	},
];

export default menuItems;
