import { connect } from "react-redux";
import { retrieveCourses } from "../actions/courses";
import CoursesPage from "../components/CoursesPage";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.courses.allIds;
	let courses = allIds.map( ( courseId ) => {
		let course = state.entities.courses.byId[ courseId ];

		let courseProps = {
			id: course.id,
			name: course.name,
			description: course.description,
			courseUrl: course.courseUrl,
			certificateUrl: course.certificateUrl,
		};

		return courseProps;
	} );

	let finishedCourses = courses.filter( ( course ) => {
		return course.status === "completed";
	} );

	return {
		finishedCourses,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadData: () => dispatch( retrieveCourses() ),
	};
};

const CoursesPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesPage );

export default CoursesPageContainer;
