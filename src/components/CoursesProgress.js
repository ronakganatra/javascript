import React from "react";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import { speak } from "@wordpress/a11y";
import PropTypes from "prop-types";
import { doRequest, prepareInternalRequest } from "../functions/api";
import styled from "styled-components";

import CourseCard from "./courses/CourseCard";
import MyYoastModal from "./MyYoastModal";
import CourseInvite from "./CourseInvite";

const OuterContainer = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 288px);
	grid-column-gap: 16px;
	grid-row-gap: 16px;
	justify-content: center;
	align-items: flex-start;
	padding: 0;
`;

const messages = defineMessages( {
	coursesPageLoaded: {
		id: "menu.courses.loaded",
		defaultMessage: "Courses page loaded",
	},
} );

/**
 * A function that returns the Courses Progress Tab component.
 *
 * @returns {ReactElement} The component that contains the progress tab of the course page.
 */
class CoursesProgress extends React.Component {
	/**
	 * Sets the CoursesProgress object.
	 *
	 * @param {object} props the properties of the component
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			modalOpen: false,
			email: "",
			confirmationEmail: "",
		};

		this.sendInvite = this.sendInvite.bind( this );
		this.closeModal = this.closeModal.bind( this );
		this.openModal = this.openModal.bind( this );
	}

	componentDidMount() {
		this.props.loadData();

		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.coursesPageLoaded );
		speak( message );
	}

	/**
	 * Sets the given field in the state to the given value.
	 *
	 * @param {string} field the field to overwrite
	 * @param {*} value the value to store
	 * @returns {void}
	 */
	setField( field, value ) {
		this.setState( {
			[ field ]: value,
		} );
	}

	/**
	 * Opens the invite student modal.
	 * @param {string} availableEnrollment the available enrollment to use.
	 * @returns {void}
	 */
	openModal( availableEnrollment ) {
		this.setState( {
			modalOpen: true,
			availableEnrollment,
		} );
	}

	/**
	 * Closes the invite student modal.
	 *
	 * @returns {void}
	 */
	closeModal() {
		this.setState( {
			modalOpen: false,
			courseInviteError: null,
		} );
	}

	/**
	 * Sends an invite to join the course to the email address as
	 * written in the state.
	 *
	 * @returns {Promise} the promise made after sending the invite through the server
	 */
	sendInvite() {
		let request = prepareInternalRequest(
			`CourseEnrollments/${this.state.availableEnrollment.id}/invite/`,
			"POST",
			{ email: this.state.email } );

		return doRequest( request )
			.then( () => {
				this.props.loadData();
				this.closeModal();
			} )
			.catch( error => {
				this.setField( "courseInviteError", error );
			} );
	}

	/**
	 * Returns the invite student modal component.
	 *
	 * @param {boolean} open if the modal should be open or not.
	 * @returns {React.Component} the modal
	 */
	getInviteModal( open ) {
		const modalAriaLabel = defineMessages( {
			id: "modal.arialabel.invite",
			defaultMessage: "Send course invite",
		} );

		return (
			<MyYoastModal
				isOpen={ open }
				onClose={ this.closeModal }
				modalAriaLabel={ modalAriaLabel }
			>
				<CourseInvite
					inviteStudentEmail={ this.state.email }
					inviteStudentEmailConfirmation={ this.state.confirmationEmail }

					onStudentEmailChange={ value => this.setField( "email", value ) }
					onStudentEmailConfirmationChange={ value => this.setField( "confirmationEmail", value ) }

					onCancelClick={ this.closeModal }
					onInviteClick={ this.sendInvite }

					courseInviteError={ this.state.courseInviteError }
				/>
			</MyYoastModal>
		);
	}

	render() {
		return (
			<OuterContainer>
				{ this.props.courses.map( ( course, i ) => <CourseCard key={ i } { ...course }
																	   onAssignModalOpen={ this.openModal } /> ) }
				{ this.getInviteModal( this.state.modalOpen ) }
			</OuterContainer>
		);
	}
}

CoursesProgress.propTypes = {
	intl: intlShape.isRequired,
	courses: PropTypes.array,
	loadData: PropTypes.func,
};

export default injectIntl( CoursesProgress );
