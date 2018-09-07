import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/Button.js";
import SiteIcon from "./SiteIcon";
import check from "../icons/checkGreen.svg";
import clock from "../icons/clock.svg";
import { Row, ColumnPrimary, ColumnFixedWidth, ColumnIcon } from "./Tables";
import { FormattedMessage, intlShape, injectIntl, defineMessages } from "react-intl";
import SiteSubscriptions from "./SiteSubscriptions";
import defaultSiteIcon from "../icons/sites_black.svg";
import defaults from "../config/defaults.json";
import { PLUGIN_MAPPING } from "../functions/products";

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
	src: PropTypes.string.isRequired,
};

const CompletedIcon = styled.img`
	height: 12px;
	padding-right: 2px;
`;

const ClockIcon = styled.img`
	height: 10px;
	padding-right: 2px;
`;

let ColumnSubscriptions = styled( ColumnFixedWidth )`
	flex-basis: 340px;
`;

let ConfigurationServiceRequestUsage = styled.span`
	display: block;
	font-weight: 300;
	margin-right: 8px;
	margin-top: 4px;
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
	let plugins = props.plugins.filter( ( plugin ) => PLUGIN_MAPPING[ props.siteType ] === plugin.type );

	let configureStatusMessage = "{ statusIcon } Configuration service requested";
	let iconValues = <ClockIcon src={ clock } alt="" />;

	if ( props.linkedConfigurationServiceRequest && props.linkedConfigurationServiceRequest.status === "in progress" ) {
		configureStatusMessage = "{ statusIcon } Configuration service in progress";
	}

	if ( props.linkedConfigurationServiceRequest && props.linkedConfigurationServiceRequest.status === "completed" ) {
		configureStatusMessage = "{ statusIcon } Configured with configuration service";
		iconValues = <CompletedIcon src={ check } alt="" />;
	}

	return (
		<Row { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ siteIcon } alt=""/></ColumnIcon>
			<ColumnPrimary ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.siteName ) }>
				{ props.siteName }
				{ props.linkedConfigurationServiceRequest &&
					<ConfigurationServiceRequestUsage>
						<FormattedMessage id="request.configured" defaultMessage={ configureStatusMessage }
											values={{ statusIcon: iconValues }} />
					</ConfigurationServiceRequestUsage>
				}
			</ColumnPrimary>
			<ColumnSubscriptions ellipsis={ true } hideOnMobile={ true } hideOnTablet={ true }
				headerLabel={ props.intl.formatMessage( messages.activeSubscriptions ) }>
				<SiteSubscriptions activeSubscriptions={ props.activeSubscriptions } plugins={ plugins } />
			</ColumnSubscriptions>
			<ColumnFixedWidth>
				<MediaQuery query={ `(min-width: ${ defaults.css.breakpoint.tablet + 1 }px)` }>
					<LargeButton onClick={ props.onClickManage }>{ props.intl.formatMessage( messages.manage ) }</LargeButton>
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
	siteName: PropTypes.string.isRequired,
	siteType: PropTypes.string.isRequired,
	plugins: PropTypes.arrayOf( PropTypes.object ),
	activeSubscriptions: PropTypes.arrayOf( PropTypes.object ),
	linkedConfigurationServiceRequest: PropTypes.object,
	siteIcon: PropTypes.string,
	onClickManage: PropTypes.func,
	intl: intlShape.isRequired,
	background: PropTypes.string,
};

Site.defaultProps = {
	activeSubscriptions: [],
	plugins: [],
	siteIcon: "",
};

export default injectIntl( Site );
