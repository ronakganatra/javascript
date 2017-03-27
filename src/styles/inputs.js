import styled from "styled-components";

/**
 * Adds input placeholder styles to a component
 *
 * @param {ReactElement} component The original component.
 * @returns {ReactElement} The component with placeholder styles.
 */
export function addPlaceholderStyles( component ) {
	return styled( component )`
		&::-webkit-input-placeholder {
			color: #646464;
		}
		
		&::-moz-placeholder {
			color: #646464;
			opacity: 1;
		}
		
		&:-ms-input-placeholder {
			color: #646464;
		}
	`;
}
