import React from "react";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import SiteIcon from "./SiteIcon";
import { Row, ColumnText, Column, ColumnIcon } from "./Tables";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import SiteSubscriptions from "./SiteSubscriptions";

const messages = defineMessages( {
	siteName: {
		id: "site.overview.siteName",
		defaultMessage: "Site name",
	},
	activeSubscriptions: {
		id: "site.overview.activeSubscriptions",
		defaultMessage: "Active subscriptions",
	},
	manage: {
		id: "site.overview.manage",
		defaultMessage: "Manage",
	},
} );

SiteIcon.propTypes = {
	src: React.PropTypes.string.isRequired,
};

/**
 * Returns the rendered Site component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Site component.
 * @constructor
 */
function Site( props ) {
	let rowProps = [];
	if ( props.background ) {
		rowProps.background = props.background;
	}
	// Todo: second column fillSpace={ true }
	return (
		<Row { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ props.siteIcon } alt=""/></ColumnIcon>
			<ColumnText ColumnWidth="250px" headerLabel={ props.intl.formatMessage( messages.siteName ) }>{ props.siteName }</ColumnText>
			<ColumnText hideOnMobile={ true } hideOnTablet={ true } headerLabel={ props.intl.formatMessage( messages.activeSubscriptions ) }
						ColumnWidth="500px"><SiteSubscriptions activeSubscriptions={ props.activeSubscriptions } plugins={ props.plugins } /></ColumnText>
			<Column>
				<MediaQuery query="(min-width: 1356px)">
					<LargeButton aria-label={ props.intl.formatMessage( messages.manage ) }
								 onClick={ props.onClickManage }>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query="(max-width: 1355px)">
					<ChevronButton aria-label={ props.intl.formatMessage( messages.manage ) }
								   onClick={ props.onClickManage } />
				</MediaQuery>
			</Column>
		</Row>
	);
}

Site.propTypes = {
	siteName: React.PropTypes.string.isRequired,
	plugins: React.PropTypes.arrayOf( React.PropTypes.object ),
	activeSubscriptions: React.PropTypes.arrayOf( React.PropTypes.object ),
	siteIcon: React.PropTypes.string,
	onClickManage: React.PropTypes.func,
	intl: intlShape.isRequired,
	background: React.PropTypes.string,
};

Site.defaultProps = {
	activeSubscriptions: [],
	plugins: [],
	siteIcon: "",
};

export default injectIntl( Site );
