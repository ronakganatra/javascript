import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/RoundButton.js";
import SiteIcon from "./SiteIcon";
import { Row, ColumnPrimary, ColumnFixedWidth, ColumnIcon } from "./Tables";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import SiteSubscriptions from "./SiteSubscriptions";
import defaultSiteIcon from "../icons/sites_black.svg";
import defaults from "../config/defaults.json";

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

let ColumnSubscriptions = styled( ColumnFixedWidth )`
	flex-basis: 340px;
`;

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

	let siteIcon = props.siteIcon || defaultSiteIcon;

	return (
		<Row { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ siteIcon } alt=""/></ColumnIcon>
			<ColumnPrimary ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.siteName ) }>
				{ props.siteName }
			</ColumnPrimary>
			<ColumnSubscriptions ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true }
				headerLabel={ props.intl.formatMessage( messages.activeSubscriptions ) }>
				<SiteSubscriptions activeSubscriptions={ props.activeSubscriptions } plugins={ props.plugins } />
			</ColumnSubscriptions>
			<ColumnFixedWidth>
				<MediaQuery query={ `(min-width: ${ defaults.css.breakpoint.tablet + 1 }px)` }>
					<LargeButton aria-label={ props.intl.formatMessage( messages.manage ) }
								 onClick={ props.onClickManage }>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
				</MediaQuery>
				<MediaQuery query={ `(max-width: ${ defaults.css.breakpoint.tablet }px)` }>
					<ChevronButton aria-label={ props.intl.formatMessage( messages.manage ) }
								   onClick={ props.onClickManage } />
				</MediaQuery>
			</ColumnFixedWidth>
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
