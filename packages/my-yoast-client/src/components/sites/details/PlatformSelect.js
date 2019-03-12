import PropTypes from "prop-types";
import React from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import { SelectArea } from "../../general/YoastSelect";
import YoastNativeSelect from "../../general/YoastNativeSelect";
import CollapsibleHeader from "../../CollapsibleHeader";
import { Paper, WhitePage } from "../../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../../Button";
import { StyledLabel } from "../../Labels";

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

/**
 * Returns the PlatformSelect component.
 *
 * @returns {ReactElement} The PlatformSelect component.
 */
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

		const value = props.siteType;
		const label = SITE_TYPE_OPTIONS[ value ].label;

		this.state = {
			selectedOption: {
				value,
				label,
			},
		};

		this.handleConfirm = this.handleConfirm.bind( this );
		this.handleOnBlur  = this.handleOnBlur.bind( this );
	}

	/**
	 * Handles the blur event.
	 *
	 * @param {object} event The blur event.
	 *
	 * @returns {void}
	 */
	handleOnBlur( event ) {
		const value = event.target.value;
		const label = SITE_TYPE_OPTIONS[ value ].label;

		this.setState( {
			selectedOption: {
				value,
				label,
			},
		} );
	}

	/**
	 * Handles the confirmation of the selected option.
	 *
	 * @param {object} event The click event on the Confirm button.
	 *
	 * @returns {void}
	 */
	handleConfirm( event ) {
		event.preventDefault();
		if ( ! this.props.disablePlatformSelect ) {
			this.props.onConfirm( this.props.siteId, this.state.selectedOption.value );
		}
	}

	/**
	 * Returns the information paragraphs component.
	 *
	 * @param {boolean} disabled Whether the select is disabled.
	 *
	 * @returns {ReactElement} The information paragraphs component.
	 */
	getInformationParagraph( disabled ) {
		return (
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

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<Paper>
				<CollapsibleHeader title={ this.props.title }>
					<WhitePage>
						{ this.getInformationParagraph( this.props.disablePlatformSelect ) }
						<StyledLabel
							htmlFor="select-platform"
						>
							<FormattedMessage
								id="sites.details.changePlatformType.enabled"
								defaultMessage="Please select a platform:"
							/>
						</StyledLabel>
						<SelectArea>
							<YoastNativeSelect
								selectId="select-platform"
								selectName="selectPlatform"
								selectDefaultValue={ this.state.selectedOption.value }
								selectOnBlur={ this.handleOnBlur }
								selectDisabled={ this.props.disablePlatformSelect }
							>
								{ Object.keys( SITE_TYPE_OPTIONS ).map( ( option ) => {
									const value = SITE_TYPE_OPTIONS[ option ].value;
									const label = SITE_TYPE_OPTIONS[ option ].label;

									return <option key={ value } value={ value }>{ label }</option>;
								} ) }
							</YoastNativeSelect>
							<WideLargeButton
								onClick={ this.handleConfirm }
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
};

PlatformSelect.defaultProps = {
	onConfirm: () => {},
	disablePlatformSelect: false,
};

export default injectIntl( PlatformSelect );
