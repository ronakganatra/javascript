import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { IconButton } from "./Button";
import Link from "./Link";
import downloadIcon from "../icons/download.svg";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import defaults from "../config/defaults.json";
import _isEmpty from "lodash/isEmpty";
import includes from "lodash/includes";

const messages = defineMessages( {
	downloadButton: {
		id: "product.buttons.download",
		defaultMessage: "Download",
	},
	version: {
		id: "product.product.version",
		defaultMessage: "version",
	},
} );

let outerMargin = 32;

const ProductContainer = styled.div`
	margin: 8px;
	padding: 16px 16px 0 16px;
	background-color: ${ colors.$color_grey_light };
	text-align: center;

	@media screen and ( min-width: ${ defaults.css.breakpoint.tablet + 1 }px ) {
		width: calc( ( 100% - ${ outerMargin }px - ${ outerMargin }px ) / 4 );
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		width: calc( ( 100% - ${ outerMargin }px ) / 2 );
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		width: 100%;
	}
`;

const ProductIcon = styled.img`
	width: 112px;
	height: 112px;
	padding: 0 0 5px 0;
	margin-top: 24px;
`;

const Downloads = styled.ul`
	padding: 0;
	margin: 0 0 24px 0;
`;

const Download = styled.li`
	list-style: none;
	text-align: center;
	margin: 24px 0 0;
`;

const ProductName = styled.span`
	display: block;
	font-size: 1.375em;
	min-height: 4em;
	font-weight: 400;
	line-height: 1.2;
	margin: 0;
`;

const ProductVersion = styled.p`
	font-weight: 300;
`;

const DownloadLabel = styled.p`
	font-size: 0.875em;
	font-weight: 300;
	margin: 2px 0 0;
`;

/**
 * The Product component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Product component.
 */
function Product( props ) {
	let productVersion = "";
	if ( ! _isEmpty( props.currentVersion ) ) {
		productVersion = <ProductVersion> { props.intl.formatMessage( messages.version ) + " " + props.currentVersion }</ProductVersion>;
	}

	let composerDownload = null;

	if ( includes( [ "plugin", "typo3-extension" ], props.type ) ) {
		composerDownload =
			<Download>
				<Link to="#" onClick={ ( event ) => {
					event.preventDefault();
					props.onComposerHelpModalOpen( props.name, props.glNumber, props.composerToken );
				} }>
					<FormattedMessage id="downloadsPage.product.install-with-composer"
					                  defaultMessage="or install with Composer"/>
				</Link>
			</Download>;
	}

	return (
		<ProductContainer>
			<ProductName>{ props.name }</ProductName>
			{ productVersion }
			<ProductIcon src={ props.icon } alt=""/>
			<Downloads>
				{ props.buttons.map( button => {
					return (
						<Download key={ button.label }>
							<IconButton
								iconSource={ downloadIcon }
								onClick={ button.onButtonClick }
								enabledStyle={ true }
								aria-label={ props.intl.formatMessage( messages.downloadButton ) + " " + props.name + " " + button.label }>
								{ props.intl.formatMessage( messages.downloadButton ) }
							</IconButton>
							<DownloadLabel aria-hidden="true">{ button.label }</DownloadLabel>
						</Download> );
				} )	}
				{composerDownload}
			</Downloads>
		</ProductContainer>
	);
}

Product.propTypes = {
	name: PropTypes.string.isRequired,
	glNumber: PropTypes.string,
	currentVersion: PropTypes.string,
	icon: PropTypes.string.isRequired,
	buttons: PropTypes.array.isRequired,
	intl: intlShape.isRequired,
	composerToken: PropTypes.object,
	onComposerHelpModalOpen: PropTypes.func,
	type: PropTypes.string,
};

export default injectIntl( Product );
