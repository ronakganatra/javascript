import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";

/**
 * Adds input placeholder styles to a component
 *
 * @param {ReactElement} component The original component.
 * @returns {ReactElement} The component with placeholder styles.
 */
export function addPlaceholderStyles( component ) {
	return styled( component )`
		&::-webkit-input-placeholder {
			color: ${colors.$color_grey_text};
		}
		
		&::-moz-placeholder {
			color: ${colors.$color_grey_text};
			opacity: 1;
		}
		
		&:-ms-input-placeholder {
			color: ${colors.$color_grey_text};
		}
	`;
}
