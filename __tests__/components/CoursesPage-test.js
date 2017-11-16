import React from 'react';
import CoursesPage from '../../src/components/CoursesPage';
import { createComponentWithIntl } from "../../utils";

test('the courses page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<CoursesPage loadCourses={ () => { "dispatch action retrieveCourses" } } loadCoursesEnrollments={ () => { "dispatch action retrieveCoursesEnrollments" } } />
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
