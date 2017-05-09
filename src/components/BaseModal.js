export class BaseAddModal extends React.Component {

	constructor( props ) {
		super( props );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<div>
				<Modal
					isOpen={ this.props.isOpen }
					onRequestClose={ this.props.onClose }
					role="dialog"
					contentLabel={ this.props.intl.formatMessage( messages.modalAriaLabel ) }
					overlayClassName={ `${ this.props.className } my-yoast-modal__overlay` }
					className={ `${ this.props.className } my-yoast-modal__content` }
				>
					<AddSite
						onLinkClick={ this.props.onLink }
						onCancelClick={ this.props.onClose }
						onChange={ this.props.onChange }
						errorFound={ this.props.errorFound }
						errorMessage={ this.props.errorMessage }
						query={ this.props.query }
					/>
				</Modal>
			</div>
		);
	}
}

BaseAddSiteModal.propTypes = {
	className: React.PropTypes.string,
	intl: intlShape.isRequired,
	isOpen: React.PropTypes.bool,
	onClose: React.PropTypes.func.isRequired,
	onLink: React.PropTypes.func.isRequired,
	onChange: React.PropTypes.func.isRequired,
	errorFound: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,
	query: React.PropTypes.string.isRequired,
};

BaseAddSiteModal.defaultProps = {
	isOpen: false,
	errorMessage: "",
};