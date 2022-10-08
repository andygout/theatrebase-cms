import PropTypes from 'prop-types';
import React from 'react';

const FormattedJson = props => {

	return (
		<pre>
			{ JSON.stringify(props.data, null, 4) }
		</pre>
	);

};

FormattedJson.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.array.isRequired,
		PropTypes.object.isRequired
	])
};

export default FormattedJson;
