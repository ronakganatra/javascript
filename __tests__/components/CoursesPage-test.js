import React from 'react';
import CoursesPage from '../../src/components/CoursesPage';
import { MemoryRouter } from "react-router-dom";
import { createComponentWithIntl } from "../../utils";

test('the courses page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<CoursesPage loadCourses={ () => { "dispatch action retrieveCourses" } } loadCoursesEnrollments={ () => { "dispatch action retrieveCoursesEnrollments" } } />
		</MemoryRouter>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
