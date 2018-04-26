import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { LargeButton } from "../components/Button.js";
import { ChevronButton } from "../components/Button.js";
import SiteIcon from "./SiteIcon";
import { Row, ColumnPrimary, ColumnFixedWidth, ColumnIcon } from "./Tables";
import { injectIntl, intlShape, defineMessages } from "react-intl";
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

let ColumnSubscriptions = styled( ColumnFixedWidth )`
	flex-basis: 340px;
`;

let StatusConfigurationServiceRequest = styled.div``;

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

	console.log( "restt", props.siteId );

	return (
		<Row { ...rowProps }>
			<ColumnIcon separator={ true }><SiteIcon src={ siteIcon } alt=""/></ColumnIcon>
			<ColumnPrimary ellipsis={ true } headerLabel={ props.intl.formatMessage( messages.siteName ) }>
				{ props.siteName }
				<StatusConfigurationServiceRequest>{ props.request.status === "submitted"
					? "Configuration service requested"
					: "Configured with configuration service" }</StatusConfigurationServiceRequest>
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
	siteId:PropTypes.string.isRequired,
	siteName: PropTypes.string.isRequired,
	siteType: PropTypes.string.isRequired,
	plugins: PropTypes.arrayOf( PropTypes.object ),
	activeSubscriptions: PropTypes.arrayOf( PropTypes.object ),
	request:PropTypes.object,
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
