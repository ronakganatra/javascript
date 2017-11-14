import { connect } from "react-redux";
import { retrieveCourses } from "../actions/courses";
import { retrieveCoursesEnrollments } from "../actions/courses";
import CoursesPage from "../components/CoursesPage";

export const mapStateToProps = ( state ) => {
	let allEnrollmentIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allEnrollmentIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];

		let courseEnrollmentProps = {
			id: course.id,
			status: course.status,
			progress: course.progress,
			courseId: course.courseId,
			buyerId: course.buyerId,
			studentId: course.studentId,
			orderId: course.orderId,
		};

		return courseEnrollmentProps;
	} );

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
		coursesEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadCourses: () => dispatch( retrieveCourses() ),
		loadCoursesEnrollments: () => dispatch( retrieveCoursesEnrollments() ),

	};
};

const CoursesPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesPage );

export default CoursesPageContainer;
