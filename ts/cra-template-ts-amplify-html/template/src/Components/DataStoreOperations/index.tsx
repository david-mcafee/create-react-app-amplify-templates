import { useEffect, useState } from 'react';
import { DataStore, Hub } from 'aws-amplify';

//@ts-ignore
function DataStoreOperations({ initSubs, deleteAll }) {
	const [ready, setReady] = useState(false);
	const [networkStatus, setNetworkStatus] = useState(false);

	useEffect(() => {
		const removeListener = Hub.listen(
			'datastore',
			async ({ payload: { event, data } }) => {
				if (event === 'ready') {
					setReady(true);
				}
				if (event === 'networkStatus') {
					setNetworkStatus(data.active);
				}
			}
		);

		return () => {
			removeListener();
		};
	}, []);

	return (
		<div>
			<p
				data-test="datastore-ready"
				style={{
					display: 'flex',
					justifyContent: 'center',
					color: 'white',
					backgroundColor: ready ? 'green' : 'red',
					padding: 0,
					margin: 0,
				}}
			>
				DataStore Ready: {ready ? 'Yes' : 'No'}
				{networkStatus}
			</p>
			<p
				style={{
					display: 'flex',
					justifyContent: 'center',
					color: 'white',
					backgroundColor: networkStatus ? 'green' : 'red',
					padding: 0,
					margin: 0,
				}}
			>
				{`User has a network connection: ${networkStatus}`}
			</p>
			<p>DS</p>
			<div className="buttons">
				<button
					data-test="datastore-start-init-subs"
					onClick={async () => {
						await DataStore.start();
						initSubs();
					}}
				>
					Start, init subs
				</button>
				<button
					data-test="datastore-start-init-subs-stop"
					onClick={async () => {
						await DataStore.start();
						initSubs();
						DataStore.stop();
					}}
				>
					Start, init subs
				</button>
				<button onClick={async () => await DataStore.stop()}>Stop</button>
				<button
					data-test="datastore-clear"
					onClick={async () => await DataStore.clear()}
				>
					Clear
				</button>
				<button
					data-test="datastore-start-stop-no-await"
					onClick={async () => {
						await DataStore.stop();
						await DataStore.start();
						initSubs();
					}}
				>
					Start / Stop without await
				</button>
				<button
					data-test="datastore-clear-then-start"
					onClick={async () => {
						await DataStore.clear();
						await DataStore.start();
						initSubs();
					}}
				>
					Clear, Start, init subs
				</button>
				<button
					data-test="datastore-stop-then-start"
					onClick={async () => {
						await DataStore.stop();
						await DataStore.start();
						initSubs();
					}}
				>
					Stop, Start, init subs
				</button>
				<button
					data-test="datastore-stop-then-clear"
					onClick={async () => {
						await DataStore.stop();
						await DataStore.clear();
					}}
				>
					Stop, Start, init subs
				</button>
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
}

export default DataStoreOperations;
