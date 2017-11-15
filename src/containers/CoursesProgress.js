import { connect } from "react-redux";
import { retrieveCoursesEnrollments } from "../actions/courses";
import CoursesProgress from "../components/CoursesProgress";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.coursesEnrollments.allIds;
	let coursesEnrollments = allIds.map( ( courseId ) => {
		let course = state.entities.coursesEnrollments.byId[ courseId ];
		let courseName = course.course.name;

		let courseProps = {
			id: course.id,
			name: courseName,
			status: course.status,
			progress: course.progress,
			courseId: course.courseId,
			buyerId: course.buyerId,
			studentId: course.studentId,
			orderId: course.orderId,
		};

		return courseProps;
	} );

	allIds = state.entities.courses.allIds;
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

	return {
		courses,
		coursesEnrollments,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		loadData: () => dispatch( retrieveCoursesEnrollments() ),
	};
};

const CoursesProgressContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( CoursesProgress );

export default CoursesProgressContainer;