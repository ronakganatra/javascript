import React from 'react';
import { mapStateToProps } from '../../src/containers/connect/Connect'

test('the mapStateToProps function', () => {
	let state = {};

	let ownProps = {
		location: {
			search: "?clientId=1" +
				"&url=https%3A%2F%2Fwww.test.abcdefg%2F%3FnestedQuery%3Dtrue%26otherNestedQuery%3DalsoTrue" +
				"&redirectUrl=https%3A%2F%2Fwww.redirect.abcdefg%2F%3FnestedQuery%3Dtrue%26otherNestedQuery%3DalsoTrue" +
				"&pluginSlug=1&pluginSlug=2&pluginSlug=a"
		},
	};

	let expected = {
		dataMissing: false,
		clientId: "1",
		url: "https://www.test.abcdefg/?nestedQuery=true&otherNestedQuery=alsoTrue",
		redirectUrl: "https://www.redirect.abcdefg/?nestedQuery=true&otherNestedQuery=alsoTrue",
		pluginSlug: [ "1", "2", "a" ],
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );
} );

test('the mapStateToProps function with missing data', () => {
	let state = {};

	let ownProps = {
		location: {
			search: ""
		},
	};

	let expected = {
		dataMissing: true,
		clientId: false,
		url: false,
		redirectUrl: false,
		pluginSlug: false,
	};

	expect( mapStateToProps( state, ownProps ) ).toEqual( expected );
} );
