import PropTypes from "prop-types";
import React from "react";
import { injectIntl, defineMessages, intlShape, FormattedMessage } from "react-intl";
import styled from "styled-components";
import { ModalHeading } from "./Headings";
import colors from "yoast-components/style-guide/colors.json";
import Link from "./Link";
import defaults from "../config/defaults.json";
import {
	ListTable,
	ColumnPrimary,
	ColumnFixedWidth,
	responsiveHeaders,
	RowMobileCollapse,
} from "./Tables";
import { makeButtonFullWidth, SecondaryGreyButton } from "./Button";


const messages = defineMessages( {
	installationGuideLink: {
		id: "downloadModal.installationGuideLink",
		defaultMessage: "View the installation guides",
	},
	downloadLink: {
		id: "downloadModal.downloadLink",
		defaultMessage: "Download",
	},
} );

const DownloadLink = styled( Link )`
	padding-left: 0;
	color: ${ colors.$color_blue };
`;

const InstallationGuideLink = styled( Link )`
	padding-left: 0;
	color: ${ colors.$color_blue };
	font-size: 14px;
	text-decoration: underline;
	display: block;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		margin-bottom: 16px;
	}
`;

const DownloadModal = styled.div`
	max-width: 640px;
	margin: auto;
	font-size: 1em;
`;

const ProductNameColumn = styled( ColumnPrimary )`
	padding-right: 50px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		padding-right: 0;
	}
`;

const DownloadLinkColumn = styled( ColumnFixedWidth )`
	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		padding-left: 0;
	}
`;

const DownloadModalCloseButton = makeButtonFullWidth( SecondaryGreyButton );

const BorderedRow = styled( RowMobileCollapse )`
	border-right: 1px solid ${ colors.$color_border };
	border-left: 1px solid ${ colors.$color_border };
	border-bottom: 1px solid ${ colors.$color_border };

	&:first-child {
		border-top: 1px solid ${ colors.$color_border };
	}
`;

const FooterArea = styled.div`
	display: flex;
	justify-content: space-between;
	padding-bottom: 28px;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}
`;

class DownloadsList extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
	}

	/**
	 * Creates a row with a download name and file link.
	 *
	 * @param   {Object}       download The download object.
	 * @returns {ReactElement}          A downloadsList row.
	 */
	makeDownloadRow( download ) {
		const ResponsiveProductNameColumn = responsiveHeaders( ProductNameColumn );

		const id = download.name;
		const productName = download.name;
		const downloadLink = download.file;

		return (
			<BorderedRow verticalAlign={ "center" } key={ id } hasHeaderLabels={ false }>
				<ResponsiveProductNameColumn>
					<span> { productName } </span>
				</ResponsiveProductNameColumn>
				<DownloadLinkColumn>
					<DownloadLink
						to={ downloadLink }
						linkTarget={ "_blank" }
						aria-label={ "Download" }
					>
						<FormattedMessage { ...messages.downloadLink } />
					</DownloadLink>
				</DownloadLinkColumn>
			</BorderedRow>
		);
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		const downloadsTable =
			<ListTable invertZebra={ true } { ...this.props }>
				{ this.props.downloads.map( ( download ) => {
					return this.makeDownloadRow( download );
				} ) }
			</ListTable>;

		return (
			<DownloadModal>
				<ModalHeading>
					<FormattedMessage id="sites.downloadsList.header" defaultMessage="Plugin downloads" />
				</ModalHeading>
				{ downloadsTable }
				<FooterArea>
					<InstallationGuideLink
						to={ "https://yoa.st/myyoast-installation" }
						linkTarget={ "_blank" }
					>
						{ this.props.intl.formatMessage( messages.installationGuideLink ) }
					</InstallationGuideLink>
					<DownloadModalCloseButton onClick={ this.props.onDownloadModalClose } enabledStyle={ false }>
						<FormattedMessage id="sites.addSite.cancel" defaultMessage="Close" />
					</DownloadModalCloseButton>
				</FooterArea>
			</DownloadModal>
		);
	}
}

DownloadsList.propTypes = {
	onDownloadModalClose: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	downloads: PropTypes.arrayOf( PropTypes.object ),
};

DownloadsList.defaultProps = {
	downloads: [],
};

export default injectIntl( DownloadsList );
