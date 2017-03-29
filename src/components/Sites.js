import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Site from "./Site";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const messages = defineMessages( {
	site: {
		id: "sites.overview.site",
		defaultMessage: "Site",
	},
	activeSubscriptions: {
		id: "sites.overview.subscriptions",
		defaultMessage: "Active subscriptions",
	},
} );

const SitesContainer = styled.ul`
	margin: 50px 0 0 0;
	padding: 0;
	list-style: none;
	position: relative;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
	li:nth-child(even) {
		background-color: ${colors.$color_background_light};
	}

	li {
		position: relative;
	
		& .site-name::before,
		& .active-subscriptions::before {
			position: absolute;
			left: -9999em;
			top: -40px;
			font-size: 1.286em;
			line-height: 1.5;
		}
    }

    li:first-child {
        & .site-name::before,
        & .active-subscriptions::before {
            left: auto;
        }
    }

    & .site-name::before {
        content: "${props => props.site}";
        position: absolute;
        top: -40px;
    }

    & .active-subscriptions::before {
        content: "${props => props.activeSubscriptions}";
        position: absolute;
        top: -40px;
    }
`;

/**
 * Returns the rendered Sites component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
function Sites( props ) {
	return (
		<SitesContainer role="list" site={props.intl.formatMessage( messages.site )}
						activeSubscriptions={props.intl.formatMessage( messages.activeSubscriptions )}>
			{ props.sites.map( function( site ) {
				return <Site key={ site.id } siteIcon={ site.siteIcon } siteName={ site.siteName }
							  activeSubscriptions={ site.activeSubscriptions } onClickManage={ props.onClick.bind( null, site.id ) } />;
			} ) }
		</SitesContainer>
	);
}

export default injectIntl( Sites );

Sites.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	onClick: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

Sites.defaultProps = {
	sites: [],
};
