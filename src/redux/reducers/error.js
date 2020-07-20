import { Map, fromJS } from 'immutable';

import {
	SET_ERROR_STATUS,
	RESET_ERROR_STATUS
} from '../utils/error-action-names';

const error = (state = Map({ exists: false }), action) => {

	switch (action.type) {

		case SET_ERROR_STATUS:
		case RESET_ERROR_STATUS:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default error;
