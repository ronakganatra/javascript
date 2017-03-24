import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Site from "./Site";

const SitesContainer = styled.div`
	background-color: ${colors.$color_blue};
	display: flex table;
	padding-right: 40px;
	align-items: center;
	
	@media screen and ( max-width: 1355px ) {
		justify-content: space-between;
	}
	
	
	& .site { display: table-row; }
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
				return < Site id={ site.id } siteIcon={ site.siteIcon} siteName={ site.siteName }
							  activeSubscriptions={ site.activeSubscriptions } />;
			} ) }
		</SitesContainer>
	);
}

Sites.propTypes = {
	sites: React.PropTypes.arrayOf( React.PropTypes.objects ),
	onClickManage: React.PropTypes.func,
};

Sites.defaultProps = {
	sites: [
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
			siteName: "wwww.yoast.com",
			activeSubscriptions: [ "woo", "video" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
			siteName: "wwww.google.com",
			activeSubscriptions: [ "woo", "video", "local" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
	],
};


