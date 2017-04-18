import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import SubNavigation, { SubNavigationItem } from "./SubNavigation";
import { NavigationItems } from "../config/Menu";
import Subscriptions from "./Subscriptions";
import Search from "./Search";

const messages = defineMessages( {
	sitesPageLoaded: {
		id: "menu.sites.loaded",
		defaultMessage: "Sites page loaded",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
} );

/**
 * Returns the rendered PageSubscriptions component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered PageSubscriptions component.
 */
class PageSubscriptions extends React.Component {
	render() {
		let changeSearchQuery = ( event ) => {
			this.props.changeSearchQuery( event.target.value );
		};
		let props = this.props;
		return (
			<div>
				<SubNavigation itemRoutes={ NavigationItems }/>
				<SubNavigationItem itemRoutes={ NavigationItems } />

				<Search
					id="search"
					description={ this.props.intl.formatMessage( messages.description ) }
					descriptionId="searchDescription"
					onChange={ changeSearchQuery }
					query={ this.props.query }
				/>
				<Subscriptions { ...props } />
			</div>
		);
	}
}

export default injectIntl( PageSubscriptions );

PageSubscriptions.propTypes = {
	changeSearchQuery: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	onManage: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
	showLoader: React.PropTypes.bool,
};

PageSubscriptions.defaultProps = {
	popupOpen: false,
	errorMessage: "",
	subscriptions: [],
};
