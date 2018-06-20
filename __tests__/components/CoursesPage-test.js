import React from 'react';
import CoursesPage from '../../src/components/CoursesPage';
import { createComponentWithIntl } from "../../utils";
import { hasAccessToFeature } from "../../src/functions/features";
import { MemoryRouter as Router } from "react-router-dom";

test('the courses page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<Router>
			<CoursesPage loadCourses={ () => { "dispatch action retrieveCourses" } } loadCoursesEnrollments={ () => { "dispatch action retrieveCoursesEnrollments" } } />
		</Router>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test( "The courses page component matches the snapshot", () => {
	const component = createComponentWithIntl(
		<Router>
			<CoursesPage loadCourses={ () => { "dispatch action retrieveCourses" } } loadCoursesEnrollments={ () => { "dispatch action retrieveCoursesEnrollments" } } />
		</Router>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
} );
