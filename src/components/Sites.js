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
			font-size: 18px;
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
			siteName: "www.yoast.com",
			activeSubscriptions: [ "woo", "video" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
			siteName: "www.google.com",
			activeSubscriptions: [ "woo", "video", "local" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
			siteName: "www.yoast.com",
			activeSubscriptions: [ "woo", "video" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
			siteName: "www.google.com",
			activeSubscriptions: [ "woo", "video", "local" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b955",
			siteName: "www.yoast.com",
			activeSubscriptions: [ "woo", "video" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
		{ id: "7e54b616-59a7-4389-af3e-c2e0c093b954",
			siteName: "www.google.com",
			activeSubscriptions: [ "woo", "video", "local" ],
			siteIcon: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
		},
	],
};


