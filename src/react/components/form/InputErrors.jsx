import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const InputErrors = props => {

	const { errors } = props;

	return (
		errors.map((errorText, index) =>
			<ul key={index}>

				<li className="field__error-list-item">{ errorText }</li>

			</ul>
		)
	);

};

InputErrors.propTypes = {
	errors: ImmutablePropTypes.list.isRequired
};

export default InputErrors;
