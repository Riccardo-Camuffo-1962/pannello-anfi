
async function saveShowSubscription( subscription )
{
	var baseUrl = 'https://servizi.anfi.it/iscrizioniexpo/'+subscription.id;
	var retVal = null;

	// console.log( subscription );
	// console.log( baseUrl );

	await fetch( baseUrl, {
		method: 'PUT',
		body: JSON.stringify( subscription ),
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then((response) => response.json())
	.then((result) => {

		if( result.error_details || result.message )
		{
			retVal = {
				status: 'FatalError',
				message: result.message,
				details: result.error_details
			};
		}
		else
			retVal = {
				status: 'Success',
				message: '',
				details: result,
			};
	})
	.catch((error) => {

		retVal = {
			status: 'FetchError',
			message: error,
			details: '',
		};
	});

	return retVal;
}

export default saveShowSubscription;
