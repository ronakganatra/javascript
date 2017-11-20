import React from 'react';
import CoursesPage from '../../src/components/CoursesPage';
import { MemoryRouter } from "react-router-dom";
import { createComponentWithIntl } from "../../utils";
import { hasAccessToFeature } from "../../src/functions/features";
import { MemoryRouter as Router } from "react-router-dom";

jest.mock( "../../src/functions/features", () => {
	return {
		hasAccessToFeature: jest.fn( () => {
			return false;
		} ),
	}
});

test('the courses page component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<CoursesPage loadCourses={ () => { "dispatch action retrieveCourses" } } loadCoursesEnrollments={ () => { "dispatch action retrieveCoursesEnrollments" } } />
		</MemoryRouter>
		);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	expect( hasAccessToFeature ).toHaveBeenCalledWith( "COURSES" );
});

test( "The courses page component matches the snapshot", () => {
	hasAccessToFeature.mockImplementation( () => {
		return true;
	} );

	const component = createComponentWithIntl(
		<Router>
			<CoursesPage loadCourses={ () => { "dispatch action retrieveCourses" } } loadCoursesEnrollments={ () => { "dispatch action retrieveCoursesEnrollments" } } />
		</Router>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
	expect( hasAccessToFeature ).toHaveBeenCalledWith( "COURSES" );

} );
