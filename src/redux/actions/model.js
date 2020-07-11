import nodeFetch from 'node-fetch';

import createAction from './base';
import { setError } from './error';
import * as actions from '../utils/model-actions';
import { pluralise } from '../../lib/strings';

const URL_BASE = 'http://localhost:3000';

const requestList = pluralisedModel =>
	createAction(actions[`REQUEST_${pluralisedModel.toUpperCase()}`]);

const receiveList = (list, pluralisedModel) =>
	createAction(actions[`RECEIVE_${pluralisedModel.toUpperCase()}`], list);

const requestInstance = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}`]);

const receiveInstance = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}`], instance);

const receiveNewFormData = formData =>
	createAction(actions[`RECEIVE_${formData.instance.model.toUpperCase()}_NEW_FORM_DATA`], formData);

const receiveEditFormData = formData =>
	createAction(actions[`RECEIVE_${formData.instance.model.toUpperCase()}_EDIT_FORM_DATA`], formData);

const requestCreate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_CREATE`]);

const receiveCreate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_CREATE`], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_UPDATE`], instance);

const requestDelete = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_DELETE`]);

const receiveDelete = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_DELETE`], instance);

const performFetch = async (url, settings) => {

	const fetch = global.fetch || nodeFetch;

	const response = await fetch(url, settings);

	if (response.status !== 200) throw new Error(response.statusText);

	return response.json();

}

const fetchList = pluralisedModel => async dispatch => {

	dispatch(requestList(pluralisedModel));

	const url = `${URL_BASE}/${pluralisedModel}`;

	try {

		const fetchedList = await performFetch(url, { mode: 'cors' });

		dispatch(receiveList(fetchedList, pluralisedModel));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstanceTemplate = model => async dispatch => {

	dispatch(requestInstance(model));

	const url = `${URL_BASE}/${pluralise(model)}/new`;

	try {

		const fetchedInstance = await performFetch(url, { mode: 'cors' });

		dispatch(receiveInstance(fetchedInstance));

		dispatch(receiveNewFormData({ instance: fetchedInstance, redirectToInstance: false }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const createInstance = instance => async dispatch => {

	const model = instance.model;

	dispatch(requestCreate(model));

	const url = `${URL_BASE}/${pluralise(model)}`;

	const fetchSettings = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'POST',
		body: JSON.stringify(instance)
	};

	try {

		const fetchedInstance = await performFetch(url, fetchSettings);

		if (fetchedInstance.hasErrors) {

			dispatch(receiveNewFormData({ instance: fetchedInstance, redirectToInstance: false }));

		} else {

			dispatch(receiveCreate(fetchedInstance));

			dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToInstance: true }));

		}

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstance = (model, uuid = null) => async dispatch => {

	// To prevent re-fetching the resource if it already exists in state,
	// add `getState` to this function's args:
	// `const fetchInstance = (model, uuid = null) => async (dispatch, getState) => {`
	// and wrap the remaining code of this function in a conditional based on `apiCallRequired`:
	// `const apiCallRequired = isInstance ? getState().getIn([model, 'uuid']) !== uuid : !getState().get(model).size;`
	// This is not applied here because it is necessary for a CMS to display the most current data from source.

	dispatch(requestInstance(model));

	const url = `${URL_BASE}/${pluralise(model)}/${uuid}/edit`;

	try {

		const fetchedInstance = await performFetch(url, { mode: 'cors' });

		dispatch(receiveInstance(fetchedInstance));

		dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToInstance: false }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const updateInstance = instance => async dispatch => {

	const model = instance.model;

	dispatch(requestUpdate(model));

	const url = `${URL_BASE}/${pluralise(model)}/${instance.uuid}`;

	const fetchSettings = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'PUT',
		body: JSON.stringify(instance)
	};

	try {

		const fetchedInstance = await performFetch(url, fetchSettings);

		if (!fetchedInstance.hasErrors) dispatch(receiveUpdate(fetchedInstance));

		dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToInstance: false }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const deleteInstance = instance => async dispatch => {

	const model = instance.model;

	dispatch(requestDelete(model));

	const url = `${URL_BASE}/${pluralise(model)}/${instance.uuid}`;

	const fetchSettings = {
		mode: 'cors',
		method: 'DELETE'
	};

	try {

		const fetchedInstance = await performFetch(url, fetchSettings);

		dispatch(receiveDelete(fetchedInstance));

		dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToList: true }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

export {
	fetchList,
	fetchInstanceTemplate,
	fetchInstance,
	createInstance,
	updateInstance,
	deleteInstance
}
