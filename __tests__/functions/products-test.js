import { getEbooks, getCares, getCourses } from "../../src/functions/products";
import { getPlugins } from "../../src/selectors/entities/products";

let products = {
	"1": {
		type: "plugin",
		glNumber: 111,
		id: "1",
	},
	"2": {
		type: "course",
		glNumber: 222,
		id: "2",
	},
	"3": {
		type: "care",
		glNumber: 333,
		id: "3",
	},
	"4": {
		type: "ebook",
		glNumber: 444,
		id: "4",
	},
};

let state = {
	entities: {
		products: {
			"byId": products,
			allIds: [ "1", "2", "3", "4" ],
		},
	},
};

test( "getPlugins util", () => {
	let expected = [ {
		type: "plugin",
		glNumber: 111,
		ids: [ "1" ],
	} ]

	expect( getPlugins( state ) ).toEqual( expected );
} );

test( "getCourses util", () => {
	let expected = [ {
		type: "course",
		glNumber: 222,
		ids: [ "2" ],
	} ]

	expect( getCourses( products) ).toEqual( expected );
} );

test( "getCares util", () => {
	let expected = [ {
		type: "care",
		glNumber: 333,
		ids: [ "3" ],
	} ]

	expect( getCares( products) ).toEqual( expected );
} );

test( "getEbooks util", () => {
	let expected = [ {
		type: "ebook",
		glNumber: 444,
		ids: [ "4" ],
	} ]

	expect( getEbooks( products) ).toEqual( expected );
} );
