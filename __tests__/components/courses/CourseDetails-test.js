import React from 'react';
import CourseDetails from "../../../src/components/courses/CourseDetails";
import { createComponentWithIntl } from "../../../utils";
import { MemoryRouter as Router } from "react-router-dom";

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
	certificateUrl: "http://yoast.academy.test/certificate",
	courseUrl: "http://yoast.academy.test/awesome_seo",
	isEnrolled: true,
	isOnSale: false,
	isFree: false,
	saleLabel: "",
};

let courseNotBought = Object.assign( {}, course );
courseNotBought.isEnrolled = false;

let courseCompleted = Object.assign( {}, course );
courseCompleted.progress = 100;

let courseNoEnrollmentsLeft = Object.assign( {}, course );
courseNoEnrollmentsLeft.usedEnrollments = 5;
courseNoEnrollmentsLeft.totalEnrollments = 5;

let courseNotStartedSingleEnrollment = Object.assign( {}, course );
courseNotStartedSingleEnrollment.progress = 0;
courseNotStartedSingleEnrollment.totalEnrollments = 1;
courseNotStartedSingleEnrollment.usedEnrollments = 1;

let courseNotStartedMultipleEnrollments = Object.assign( {}, course );
courseNotStartedMultipleEnrollments.progress = 0;

let courseOnSale = Object.assign( {}, course );
courseOnSale.isEnrolled = false;
courseOnSale.isOnSale = true;
courseOnSale.saleLabel = "Now 101% of!";

let courseFree = Object.assign( {}, course );
courseFree.isFree = true;

test( 'The CourseDetails component matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...course } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that has not been bought, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseNotBought } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that is completed, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseCompleted } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that has no unassigned enrollments left, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseNoEnrollmentsLeft } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that has not been started yet with a single enrollment, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseNotStartedSingleEnrollment } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that has not been started yet with multiple other enrollment, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseNotStartedMultipleEnrollments } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that is on sale, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseOnSale } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseDetails component, for a course that is free, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseFree } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'Assigning a course to someone else through a CourseDetails works, when the course has not been started yet.', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...courseNotStartedSingleEnrollment } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	// Click on "assign to someone else".
	const instance = component.root;
	const assignToSomeoneElseLink = instance.findByProps( { "testId": "assign-to-someone-else" } );
	assignToSomeoneElseLink.props.onClick();

	// Modal should be shown.
	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'Assigning a course to someone else through a CourseDetails works, when there are enrollments left.', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseDetails { ...course } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	// Click on "assign courses".
	const instance = component.root;
	const assignLink = instance.findByProps( { "testId": "assign-courses" } );
	assignLink.props.onClick();

	// Modal should be shown.
	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );
