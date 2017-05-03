import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { IconButton } from "./Button";
import downloadIcon  from "../icons/download.svg";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const messages = defineMessages( {
	downloadButton: {
		id: "download-page.buttons.download",
		defaultMessage: "Download",
	},
} );

let responsiveWidthThreshold = 1355;
let mobileViewThreshold = 600;

const DownloadContainer = styled.div`
	margin: 8px;
	padding: 16px;
	background-color: ${ colors.$color_grey_light };
	display: flex;
	flex-direction: column;
	align-items: center;
	
	@media screen and ( min-width: ${ responsiveWidthThreshold }px ) {
		width: calc( 25% - 8px - 8px );
	}

	@media screen and ( max-width: ${ responsiveWidthThreshold }px ) {
		width: calc( 50% - 8px - 8px );
	}
	
	@media screen and ( max-width: ${ mobileViewThreshold }px ) {
		width: calc( 100% - 8px - 8px );
	}
`;

const DownloadIcon = styled.img`
	width: 112px;
	height: 112px;
	padding: 0 0 5px;
`;

const DownloadList = styled.ul`
	padding: 0;
	margin: 0px 0 0;
`;

const DownloadListItem = styled.li`
	list-style: none;
	text-align: center;
	margin: 20px 0 0;
`;

const ProductName = styled.h2`
	font-size: 1.5em;
	font-weight: 700px;
	margin: 0;
`;

const ProductVersion = styled.p`
	font-size: 1em;
	font-weight: 300px;
	margin: 0 0 16px;
`;

const ButtonLabel = styled.p`
	font-size: 0.9em;
	font-weight: 300px;
	margin: 2px 0 12px;
`;

/**
 * The Download component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Download component
 */
function Download( props ) {
	return (
		<DownloadContainer>
			<ProductName>{ props.product }</ProductName>
			<ProductVersion>{ props.version }</ProductVersion>
			<DownloadIcon src={ props.iconSource } alt=""/>
			<DownloadList>
				{ props.buttons.map( button => {
					return ( <DownloadListItem key={ button.label }> <IconButton
															iconSource={ downloadIcon }
															onClick={ button.onButtonClick }
															iconSize={ "16px" }
					>
						{ props.intl.formatMessage( messages.downloadButton ) }
					</IconButton>
						<ButtonLabel>{ button.label }</ButtonLabel></DownloadListItem> );
				} )	}
			</DownloadList>
		</DownloadContainer>
	);
}

Download.propTypes = {
	product: React.PropTypes.string.isRequired,
	version: React.PropTypes.string.isRequired,
	iconSource: React.PropTypes.string.isRequired,
	buttons: React.PropTypes.array.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl( Download );
