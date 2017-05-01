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

const DownloadContainer = styled.div`
	width: calc( 25% - 10px - 10px );
	margin: 10px 10px 10px 10px;
	background-color: ${ colors.$color_pink_light };
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
`;

const DownloadIcon = styled.img`
	width: 90px;
	height: 90px;
`;

const DownloadListItem = styled.li`
	list-style: none;
	text-align: center;
`;

const DownloadList = function( props ) {
	return (
		<ul>
			{ props.buttons.map( button => {
				return ( <DownloadListItem> <IconButton iconSource={ downloadIcon }
										  onClick={ button.onButtonClick }
										  iconSize={ "16px" }>
					{ props.intl.formatMessage( messages.downloadButton ) }
				</IconButton>
					{ button.label }</DownloadListItem> );
			} )	}
		</ul>
	);
};

DownloadList.propTypes = {
	buttons: React.PropTypes.array.isRequired,
	intl: intlShape.isRequired,
};

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
			<span>{ props.product }</span>
			<span>{ props.version }</span>
			<DownloadIcon src={ props.iconSource }/>
			<DownloadList buttons={ props.buttons } intl={ props.intl } />
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
