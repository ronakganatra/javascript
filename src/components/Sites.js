import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import Site from "./Site";

const SitesContainer = styled.div`
	background-color: ${colors.$color_grey_light};
	& .p { margin-left: 90px }
	font: normal 14px/1.4 "Open Sans", sans-serif;
`;

const SitesList = styled.div`
	display: flex table;
	align-items: center;
	box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.3);
	div:nth-child(even) {
		background-color: ${colors.$color_background_light};
	}
	
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
			<p>Sites Subscriptions</p>
			<SitesList>
			{ props.sites.map( function( site ) {
				return < Site id={ site.id } siteIcon={ site.siteIcon} siteName={ site.siteName }
							  activeSubscriptions={ site.activeSubscriptions } />;
			} ) }
			</SitesList>
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


