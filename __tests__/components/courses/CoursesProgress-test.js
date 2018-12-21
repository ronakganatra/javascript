import React from 'react';
import CoursesProgress from "../../../src/components/CoursesProgress";
import { createComponentWithIntl } from "../../../utils";

import sampleHeader from "../../../src/images/sample_course_card_header.png";

let course = {
	imageUrl: sampleHeader,
	title: "Awesome SEO Course",
	description: "This is an awesome, sexy SEO course.",
	progress: 50,
	totalEnrollments: 5,
	usedEnrollments: 4,
	availableEnrollment: {},
	shopUrl: "http://yoast.test/shop",
	certificateUrl: "http://academy.yoast.test/certificate",
	courseUrl: "http://academy.yoast.test/awesome_seo",
	isEnrolled: true,
};

let courseNotBought = Object.assign( {}, course );
courseNotBought.isEnrolled = false;

let courses = [ course, courseNotBought ];

test( 'The CoursesProgress component matches the snapshot', () => {
	let loadData = jest.fn();

	const component = createComponentWithIntl(
		<CoursesProgress courses={ courses } loadData={ loadData } />
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
