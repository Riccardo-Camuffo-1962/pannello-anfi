
async function getData( url, page = 0, filter = '' )
{
	const timeout = 8000;
	const controller = new AbortController();
	const timeout_id = setTimeout(() => controller.abort(), timeout);

	var baseUrl = page === 0 ? url : url+'?page='+page;

	if( filter !== '' )
		baseUrl += filter;

	try {

		const config = {
			method: 'GET',
			credentials: 'include',
			redirect: 'follow',
			cache: 'no-cache',
			referrerPolicy: 'no-referrer',
			signal: controller.signal,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Accept': '*/*',
				'Accept-Language': '*',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '+
							  'AppleWebKit/537.36 (KHTML, like Gecko) '+
							  'Chrome/89.0.4389.114 Safari/537.36'
			}
		};

		const request = new Request( baseUrl, config );

		const promise = await fetch( request );
		const response = await promise.json();

		clearTimeout( timeout_id );
		return response;
	}
	catch( error )
	{
		console.error( 'Errore drammatico:', error );

		// TODO: capire cosa fare...
		//
		return;
	}
}

export default getData;
