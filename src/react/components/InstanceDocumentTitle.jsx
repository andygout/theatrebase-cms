import React from 'react';
import { Helmet } from 'react-helmet';

import { formActions } from '../../utils/constants';

const DocumentTitle = props => {

	const { name, model, formAction } = props;

	const text = (action => {

		switch (action) {

			case formActions.CREATE:
				return `New ${model}`;

			case formActions.UPDATE:
				return `${name} (${model})`;

			default:
				return '';

		}

	})(formAction);

	return (
		<Helmet title={text} />
	);

};

export default DocumentTitle;
