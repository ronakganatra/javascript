import React from 'react';
import CourseCard from "../../../src/components/courses/CourseCard";
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
	availableEnrollment: "",
	shopUrl: "http://yoast.test/shop",
	certificateUrl: "http://yoast.academy.test/certificate",
	courseUrl: "http://yoast.academy.test/awesome_seo",
	isEnrolled: true,
};

let courseNotBought = Object.assign( {}, course );
courseNotBought.isEnrolled = false;

let courseCompleted = Object.assign( {}, course );
courseCompleted.progress = 100;

let courseNoEnrollmentsLeft = Object.assign( {}, course );
courseNoEnrollmentsLeft.usedEnrollments = 5;
courseNoEnrollmentsLeft.totalEnrollments = 5;

let courseNotStarted = Object.assign( {}, course );
courseNotStarted.progress = 0;

test( 'The CourseCard component matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...course } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseCard component, for a course that has not been bought, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...courseNotBought } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseCard component, for a course that is completed, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...courseCompleted } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseCard component, for a course that has no unassigned enrollments left, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...courseNoEnrollmentsLeft } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'The CourseCard component, for a course that has not been started yet, matches the snapshot', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...courseNotStarted } onAssignModalOpen={ onAssignModalOpen } />
		</Router>
	);

	let tree = component.toJSON();
	expect( tree ).toMatchSnapshot();
} );

test( 'Assigning a course to someone else through a CourseCard works, when the course has not been started yet.', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...courseNotStarted } onAssignModalOpen={ onAssignModalOpen } />
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

test( 'Assigning a course to someone else through a CourseCard works, when there are enrollments left.', () => {
	let onAssignModalOpen = jest.fn();

	const component = createComponentWithIntl(
		<Router>
			<CourseCard { ...course } onAssignModalOpen={ onAssignModalOpen } />
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