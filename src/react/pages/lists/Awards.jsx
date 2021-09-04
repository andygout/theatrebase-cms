import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ListWrapper } from '../../utils';

class Awards extends React.Component {

	render () {

		return (
			<ListWrapper
				instances={this.props.awards}
				pageTitleText='Awards'
			>
			</ListWrapper>
		);

	}

}

Awards.propTypes = {
	awards: ImmutablePropTypes.list.isRequired
};

const mapStateToProps = state => ({
	awards: state.get('awards')
});

export default connect(mapStateToProps)(Awards);