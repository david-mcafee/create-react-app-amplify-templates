import React from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import {
	Project11,
	Project12,
	Project13,
	Team11,
	Team12,
	Team13,
} from '../../models';

const Home = () => {
	async function deleteAll() {
		await DataStore.delete(Project11, Predicates.ALL);
		await DataStore.delete(Team11, Predicates.ALL);
		await DataStore.delete(Project12, Predicates.ALL);
		await DataStore.delete(Team12, Predicates.ALL);
		await DataStore.delete(Project13, Predicates.ALL);
		await DataStore.delete(Team13, Predicates.ALL);
	}

	return (
		<div>
			<h1>DS Custom PK Sample</h1>
			<div className="buttons">
				<button
					onClick={deleteAll}
					data-test="datastore-delete-all"
					style={{ backgroundColor: 'red' }}
				>
					Delete All Records
				</button>
			</div>
		</div>
	);
};

export default Home;
