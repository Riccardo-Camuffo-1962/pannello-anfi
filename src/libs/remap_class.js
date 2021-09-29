
function remapClass( classID )
{
	const classes = [
		{ class_id: '1', name: 'Supreme Champion', title: 'PH' },
		{ class_id: '2', name:'Supreme Premior', title: 'PH' },
		{ class_id: '3', name: 'Grand International Champion', title: 'CACS' },
		{ class_id: '4', name: 'Grand International Premior', title: 'CAPS' },
		{ class_id: '5', name: 'International Champion', title: 'CAGCIB' },
		{ class_id: '6', name: 'International Premior', title: 'CAGPIB' },
		{ class_id: '7', name: 'Champion', title: 'CACIB' },
		{ class_id: '8', name: 'Premior', title: 'CAPIB' },
		{ class_id: '9', name: 'Aperta', title: 'CAC' },
		{ class_id: '10', name: 'Neutri', title: 'CAP' },
		{ class_id: '11', name: 'Giovani (7-10 mesi)', title: '' },
		{ class_id: '12', name: 'Cuccioli (4-7 mesi)', title: '' },
		{ class_id: '13.a', name: 'Novizi', title: '' },
		{ class_id: '13.b', name: 'Control class', title: '' },
		{ class_id: '13.c', name: 'Determination class', title: '' },
		{ class_id: '14', name: 'Gatti di casa', title: '' },
		{ class_id: '15', name: 'Fuori concorso', title: '' },
	];

	const	fifeClass = classes.find( ({ class_id }) => class_id === classID );
	return	fifeClass;
}

export default remapClass;
