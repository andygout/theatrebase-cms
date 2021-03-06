import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Input, InputErrors } from '.';

const InputAndErrors = props => {

	const { type, value, errors, handleChange } = props;

	return (
		<React.Fragment>

			<Input
				type={type}
				value={value}
				hasErrors={Boolean(errors)}
				handleChange={handleChange}
			/>

			{
				Boolean(errors) && (
					<InputErrors errors={errors} />
				)
			}

		</React.Fragment>
	);

};

InputAndErrors.propTypes = {
	type: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	errors: ImmutablePropTypes.list,
	handleChange: PropTypes.func.isRequired
};

export default InputAndErrors;
