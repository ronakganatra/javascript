import React from "react";
import _isPlainObject from "lodash/isPlainObject";
import _merge from "lodash/merge";

function getPropsAndContent( obj ) {
	let props = {};

	if ( _isPlainObject( obj ) ) {
		_merge( props, obj );
		obj = props.content;
		delete props.content;
	}

	return [ props, obj ];
}

export function table( headers, rows, props = {} ) {
	return (
		<table { ...props }>
			{ thead( headers ) }
			{ tbody( rows ) }
		</table>
	);
}

export function thead( headers ) {
	return (
		<thead>
			<tr>
				{ headers.map( ( header, i ) => {
					let [ props, content ] = getPropsAndContent( header );
					props.key = props.key || i;
					return <th { ...props }>{ content }</th>;
				} ) }
			</tr>
		</thead>
	);
}

export function tbody( rows ) {
	return (
		<tbody>
			{ rows.map( ( row, i ) => {
				let [ props, content ] = getPropsAndContent( row );
				props.key = props.key || i;
				return tr( content, props );
			} ) }
		</tbody>
	);
}

export function tr( cells, props ) {
	return (
		<tr { ...props }>
			{ cells.map( ( cell, i ) => {
				let [ props, content ] = getPropsAndContent( cell );
				props.key = props.key || i;
				return <td { ...props }>{ content }</td>;
			} ) }
		</tr>
	);
}
