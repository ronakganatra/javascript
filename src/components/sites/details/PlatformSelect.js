import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import YoastSelect, { SelectArea } from "../../general/YoastSelect";
import CollapsibleHeader from "../../CollapsibleHeader";
import { Paper, WhitePage } from "../../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../../Button";
import { SpanStyledAsLabel } from "../../Labels";

const WideLargeButton = makeButtonFullWidth( LargeButton );

const SITE_TYPE_OPTIONS = {
	wordpress: {
		value: "wordpress",
		label: "WordPress",
	},
	typo3: {
		value: "typo3",
		label: "TYPO3",
	},
};

class PlatformSelect extends React.Component {
	/**
	 * Initializes the class with the specified props.
	 *
	 * @param {Object} props The props to be passed to the class that was extended from.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		let value = props.siteType;
		let label = SITE_TYPE_OPTIONS[ value ].label;

		this.state = {
			selectedOption: {
				value,
				label,
			},
		};
	}

	handleChange( selectedOption ) {
		this.setState( {
			selectedOption,
		} );
	}

	/**
	 * Handles the confirm event.
	 *
	 * @param {object} event The confirm event.
	 *
	 * @returns {void}
	 */
	handleConfirm( event ) {
		event.preventDefault();
		if ( ! this.props.disablePlatformSelect ) {
			this.props.onConfirm( this.props.siteId, this.state.selectedOption.value );
		}
	}

	getInformationParagraph( disabled ) {
		return(
			<div>
				<p><FormattedMessage
					id="sites.details.changePlatformType.label"
					defaultMessage="Here you can select the platform that your website is running on."
				/></p>
				{ disabled &&
					<p><FormattedMessage
						id="sites.details.changePlatformType.disabled"
						defaultMessage="This option is currently disabled because you still have plugins active on this site."
					/></p>
				}
			</div>
		);
	}

	render() {
		return(
			<Paper>
				<CollapsibleHeader title={ this.props.title }>
					<WhitePage>
						{ this.getInformationParagraph( this.props.disablePlatformSelect ) }
						<SpanStyledAsLabel
							id="select-platform-label"
							onClick={ () => this.selectRef && this.selectRef.focus() }
						>
							<FormattedMessage
								id="sites.details.changePlatformType.enabled"
								defaultMessage="Please select a platform:"
							/>
						</SpanStyledAsLabel>
						<SelectArea>
							<YoastSelect
								value={ this.state.selectedOption.value }
								onChange={ this.handleChange.bind( this ) }
								searchable={ false }
								clearable={ false }
								tabSelectsValue={ true }
								innerRef={ ( ref ) => {
									this.selectRef = ref;
								} }
								disabled={ this.props.disablePlatformSelect }
								options={ Object.values( SITE_TYPE_OPTIONS ) }
								aria-labelledby="select-platform-label"
							/>
							<WideLargeButton
								onClick={ this.handleConfirm.bind( this ) }
								enabledStyle={ ! this.props.disablePlatformSelect }
							>
								<FormattedMessage
									id="sites.details.platformConfirm"
									defaultMessage="Confirm"
								/>
							</WideLargeButton>
						</SelectArea>
					</WhitePage>
				</CollapsibleHeader>
			</Paper>
		);
	}
}

PlatformSelect.propTypes = {
	siteId: PropTypes.string.isRequired,
	siteType: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onConfirm: PropTypes.func,
	disablePlatformSelect: PropTypes.bool,
	intl: intlShape.isRequired,
};

export default injectIntl( PlatformSelect );
