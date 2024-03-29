import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ListWrapper } from '../../wrappers';

const Awards = props => {

	return (
		<ListWrapper
			instances={props.awards}
			pageTitleText='Awards'
		>
		</ListWrapper>
	);

};

Awards.propTypes = {
	awards: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	awards: state.awards
});

export default connect(mapStateToProps)(Awards);
