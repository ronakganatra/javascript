import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Site from "./Site";

const SitesContainer = styled.ul`
	margin: 50px 0 0 0;
	padding: 0;
	list-style: none;
	position: relative;
	box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.3);
	li:nth-child(even) {
		background-color: ${colors.$color_background_light};
}

	li:first-child {
		& .site-name::before,
		& .active-subscriptions::before {
		position: absolute;
			top: -40px;
			font-size: 1.125em;
		line-height: 1.5;
	}

	& .site-name::before {
		content: "Site";
				position: absolute;
			top: -40px;
	}

	& .active-subscriptions::before {
		content: "Active subscriptions";
				position: absolute;
				top: -40px;
		}
  	}
  `;

/**
 * Returns the rendered Sites component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 * @constructor
 */
export default function Sites( props ) {
	return (
		<SitesContainer>
			{ props.sites.map( function( site ) {
				return < Site key={ site.id } siteIcon={ site.siteIcon } siteName={ site.siteName }
							  activeSubscriptions={ site.activeSubscriptions } onClickManage={ props.onClick.bind( null, site.id ) } />;
			} ) }
		</SitesContainer>
	);
}

Sites.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.object ),
	onClick: React.PropTypes.func.isRequired,
};

Sites.defaultProps = {
	sites: [],
};


