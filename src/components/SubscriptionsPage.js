import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import Subscriptions from "./Subscriptions";
import Search from "./Search";
import a11ySpeak from "a11y-speak";

const messages = defineMessages( {
	pageSubscriptionsLoaded: {
		id: "menu.account.subscriptions.loaded",
		defaultMessage: "Subscriptions are loaded",
	},
	description: {
		id: "search.description",
		defaultMessage: "The search results will be updated as you type.",
	},
} );

/**
 * Returns the rendered SubscriptionsPage component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered SubscriptionsPage component.
 */
class SubscriptionsPage extends React.Component {
	componentDidMount() {
		let message = this.props.intl.formatMessage( messages.pageSubscriptionsLoaded );
		a11ySpeak( message );
	}

	render() {
		let props = this.props;

		let changeSearchQuery = ( event ) => {
			this.props.onSearchChange( event.target.value );
		};

		return (
			<div>
				<Search
					id="search"
					description={ this.props.intl.formatMessage( messages.description ) }
					descriptionId="searchDescription"
					query={ this.props.query }
					onChange={ changeSearchQuery }
				/>
				<Subscriptions { ...props } />
			</div>
		);
	}
}

SubscriptionsPage.propTypes = {
	onSearchChange: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	query: React.PropTypes.string,
};

export default injectIntl( SubscriptionsPage );
