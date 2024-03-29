import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { PersonForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const Person = props => {

	const { person, personFormData } = props;

	return (
		<InstanceWrapper
			instance={person}
			formAction={personFormData.action}
		>

			<PersonForm
				instance={personFormData.instance || {}}
				action={personFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Person.propTypes = {
	person: PropTypes.object.isRequired,
	personFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	person: state.person,
	personFormData: state.personFormData
});

export default connect(mapStateToProps)(Person);
