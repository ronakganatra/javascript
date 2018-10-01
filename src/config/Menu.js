import sitesIcon from "../icons/sites.svg";
import coursesIcon from "../icons/courses.svg";
import userIcon from "../icons/user.svg";
import downloadsIcon from "../icons/download.svg";
import SitesPageContainer from "../containers/SitesPage";
import AccountPage from "../components/AccountPage";
import DownloadsPage from "../containers/DownloadsPage";
import CoursesPage from "../containers/CoursesPage";

const menuItems = [
	{
		showInMenu: true,
		path: "/sites",
		titleKey: "sites",
		iconSource: sitesIcon,
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
		exact: false,
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
