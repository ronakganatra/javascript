import React from "react";
import colors from "yoast-components/style-guide/colors.json";

/**
 * Returns the rendered Table component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Table component.
 * @constructor
 */
export default function Zebra( props ) {
	let zebraProps = Object.assign( {}, ...props );
	zebraProps.children = props.children.map( ( child, key ) => {
		return React.cloneElement( child, {
			background: ( key % 2 === 0 ) ? colors.$palette_white : colors.$palette_grey_light,
		} );
	} );

	return (
		<span { ...zebraProps }/>
	);
}

Zebra.propTypes = {
	children: React.PropTypes.array,
};
