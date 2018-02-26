import PropTypes from "prop-types";
import React from "react";
import { injectIntl } from "react-intl";
import { Paper, Page } from "../PaperStyles";
import { LargeButton, makeButtonFullWidth } from "../Button";
import { ListHeading } from "../Headings";

let ResponsiveButton = makeButtonFullWidth( LargeButton );

/**
 * Returns the rendered ConfigurationRequestForm component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered ConfigurationRequestForm component.
 */
class ConfigurationRequestForm extends React.Component {
	/**
	 * Sets the ConfigurationRequestForm component.
	 * @param {Object} props All of the props passed to this component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<Paper>
				<Page>
					<ListHeading>Configuration Service</ListHeading>
					<ResponsiveButton>Kill meh0</ResponsiveButton>
				</Page>
			</Paper>
		);
	}
}

export default injectIntl( ConfigurationRequestForm );

ConfigurationRequestForm.propTypes = {
	sites: PropTypes.array,
};
