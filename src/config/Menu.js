import sitesIcon from "../icons/sites.svg";
import coursesIcon from "../icons/courses.svg";
import userIcon from "../icons/user.svg";
import SitesPageContainer from "../containers/SitesPage";
import AccountPage from "../components/AccountPage";
import CoursesPage from "../components/CoursesPage";

let menuItems = [
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
		path: "/account",
		titleKey: "account",
		iconSource: userIcon,
		component: AccountPage,
		exact: false,
	},
];

export default menuItems;
