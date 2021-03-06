import { expect } from 'chai';

import pruneInstance from '../../../src/lib/prune-instance';

describe('prune Instance module', () => {

	it('removes top-level concealed attributes (e.g. \'errors\', and \'uuid\')', () => {

		const instance = {
			name: 'King Lear',
			errors: {},
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear'
		};

		expect(result).to.deep.equal(expectation);

	});

	it('retains top-level \'model\' attribute', () => {

		const instance = {
			name: 'King Lear',
			model: 'production'
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			model: 'production'
		};

		expect(result).to.deep.equal(expectation);

	});

	it('removes nested-level concealed attributes (e.g. \'errors\', and \'model\')', () => {

		const instance = {
			name: 'King Lear',
			cast: [
				{
					name: 'Ian McKellen',
					errors: {},
					model: 'person',
					roles: [
						{
							name: 'King Lear',
							errors: {},
							model: 'role',
							characterName: ''
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			cast: [
				{
					name: 'Ian McKellen',
					roles: [
						{
							name: 'King Lear',
							characterName: ''
						}
					]
				}
			]
		};

		expect(result).to.deep.equal(expectation);

	});

	describe('filters out array items that have empty string name', () => {

		context('array items with non-empty strings exist', () => {

			it('filters out array items that have empty string name values', () => {

				const instance = {
					name: 'King Lear',
					cast: [
						{
							name: 'Ian McKellen',
							roles: [
								{
									name: 'King Lear',
									characterName: ''
								},
								{
									name: '',
									characterName: ''
								}
							]
						},
						{
							name: '',
							roles: [
								{
									name: '',
									characterName: ''
								}
							]
						}
					]
				};

				const result = pruneInstance(instance);

				const expectation = {
					name: 'King Lear',
					cast: [
						{
							name: 'Ian McKellen',
							roles: [
								{
									name: 'King Lear',
									characterName: ''
								}
							]
						}
					]
				};

				expect(result).to.deep.equal(expectation);

			});

		});

		context('array items with non-empty strings do not exist', () => {

			it('leaves single array item that has empty string name value', () => {

				const instance = {
					name: 'King Lear',
					cast: [
						{
							name: '',
							roles: [
								{
									name: '',
									characterName: ''
								}
							]
						}
					]
				};

				const result = pruneInstance(instance);

				const expectation = {
					name: 'King Lear',
					cast: [
						{
							name: '',
							roles: [
								{
									name: '',
									characterName: ''
								}
							]
						}
					]
				};

				expect(result).to.deep.equal(expectation);

			});

		});

	});

	it('prunes a sample instance as per specification', () => {

		const instance = {
			name: 'King Lear',
			errors: {},
			model: 'production',
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e',
			venue: {
				name: 'Courtyard Theatre',
				errors: {},
				model: 'venue'
			},
			material: {
				model: 'material',
				name: '',
				format: '',
				errors: {}
			},
			cast: [
				{
					name: 'Ian McKellen',
					errors: {},
					model: 'person',
					roles: [
						{
							name: 'King Lear',
							errors: {},
							model: 'role',
							characterName: ''
						},
						{
							name: '',
							errors: {},
							model: 'role',
							characterName: ''
						}
					]
				},
				{
					name: '',
					errors: {},
					model: 'person',
					roles: [
						{
							name: '',
							errors: {},
							model: 'role',
							characterName: ''
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			model: 'production',
			venue: {
				name: 'Courtyard Theatre'
			},
			material: {
				name: '',
				format: ''
			},
			cast: [
				{
					name: 'Ian McKellen',
					roles: [
						{
							name: 'King Lear',
							characterName: ''
						}
					]
				}
			]
		};

		expect(result).to.deep.equal(expectation);

	});

});
