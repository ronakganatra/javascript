import { getEbooks, getCares, getCourses, getPlugins } from "../../src/functions/products";

let products = {
	"1": {
		type: "plugin",
	},
	"2": {
		type: "course",
	},
	"3": {
		type: "care",
	},
	"4": {
		type: "ebook",
	},
}

test( "getPlugins util", () => {
	let expected = [ {type: "plugin"} ]

	expect( getPlugins( products) ).toEqual( expected );
} );

test( "getCourses util", () => {
	let expected = [ {type: "course"} ]

	expect( getCourses( products) ).toEqual( expected );
} );

test( "getCares util", () => {
	let expected = [ {type: "care"} ]

	expect( getCares( products) ).toEqual( expected );
} );

test( "getEbooks util", () => {
	let expected = [ {type: "ebook"} ]

	expect( getEbooks( products) ).toEqual( expected );
} );
